Meteor.startup(function(){
    
   // ____________________________________________________________________________
   // FINANCIAL FUNCTIONS LIBRARY
   // To call function: Fin.functionName(args)
   //
   // eg. Fin.bond_price(bond, Y, vd)
   //
   //  Dates used for calculations should have following format:
   //  new Date(year, month, day, 0, 0, 0, 0) to avoid any problems comming from 
   //  deducting not only date but also time.
   // ____________________________________________________________________________
   
   Fin = (function(){
       
       finAPI = {};

        // ________________________________________________________________________        
        // function full_years(maturity)
        // Arguments: maturity - bond's maturity in Date format.
        // Assumption: coupons are paid once a year.
        // Calculates full years left between next futere coupon and maturity
        // eg. DS0725
        // today: 28/07/2015
        // maturity: 25/07/25
        // next coupon: 25/07/2016
        // full_years(25/07/2015) = 9
        // ________________________________________________________________________
        var full_years = function(maturity) {
            var today = new Date(),
                bondMaturity = new Date(maturity),
                years=0;
            
            while (bondMaturity > today) {
                bondMaturity.setFullYear( bondMaturity.getFullYear() - 1);
                years += 1;
            }
            
            return years - 1;
        }
        
        // _________________________________________________________________________________
        // function bond_price(bond, Y, vd)
        // Calculates bond's price based on yield, value date and bond object.
        // Arguments: 
        // bond: object {
        //          maturity: bond's maturity in Date format
        //          coupon:   bond's coupon, eg. 3.25 (3.25%)
        //          couponAccuracy: number of decimal places for accrued interest assuming 
        //                           100 bond's nominal, eg. 3 for POLGBs
        //       }
        // Y - bonds yield, eg. 1.97 (1.97%)
        // vd - value date in Date format
        //
        // eg. bond_price(bond, 1.97, new Date(2025, 7, 25))
        // _________________________________________________________________________________
        
        var bond_price = function(bond, Y, vd) {
            var y =         Y/100, // yield from 3 to 0.03
                m =         bond.maturity,
                c =         bond.coupon,
                accuracy = Math.pow(10, bond.couponAccuracy);
                
            var one_day = 24*60*60*1000,
                full_years_to_maturity = full_years(m),
                next_coupon_date = new Date(m.getFullYear() - full_years_to_maturity, m.getMonth(), m.getDate() ),
                last_coupon_date = new Date(next_coupon_date.getFullYear() - 1, next_coupon_date.getMonth(), next_coupon_date.getDate());
            
            // base is calculated only  for current not full year till next coupon payment
            var base = Math.round((next_coupon_date - last_coupon_date)/one_day),
                days_to_coupon = Math.round((next_coupon_date - vd)/one_day),
                days_from_last_coupon = Math.round((vd - last_coupon_date)/one_day),
                accrued_interest = Math.round(accuracy * c * days_from_last_coupon/base)/accuracy;
              
            var dsc_coupons = c/y*(1-1/Math.pow(1+y, full_years_to_maturity)),
                dsc_capital = 100/(Math.pow(1+y, full_years_to_maturity));
            
            var price = (dsc_coupons + c + dsc_capital)/(Math.pow(1+y, days_to_coupon/base)) - accrued_interest;
            
            return price;
        }
        
        // _______________________________________________________________________________________
        // function bond_yield(bond, price, min_yield, max_yield, vd)
        // Calculates bond's yield based on bond object, price, min and max yield and value date
        // Arguments:
        // bond: object {
        //          maturity: bond's maturity in Date format
        //          coupon:   bond's coupon, eg. 3.25 (3.25%)
        //          couponAccuracy: number of decimal places for accrued interest assuming 
        //                           100 bond's nominal, eg. 3 for POLGBs
        //       }
        // price: bond's price, eg. 103.30
        // min_yield: lowest possible yield, eg. 0.5
        // max_yield: highest possible yield, eg. 5
        // vd: value date 
        // 
        // eg. bond_yield(bond, 103.30, 0.5, 5, new Date(2025, 7, 25))
        // ______________________________________________________________________________________
        var bond_yield = function(bond, price, min_yield, max_yield, vd) {
                
            var low_price =     bond_price(bond, max_yield, vd),
                high_price =    bond_price(bond, min_yield, vd),
                accuracy =      Math.pow(10, bond.couponAccuracy),
                mid_yield,
                mid_price = 1;

            while (Math.round(Math.abs(low_price - high_price)*accuracy) !== 0) {
                mid_yield = (min_yield + max_yield)/2;
                mid_price = bond_price(bond, mid_yield, vd);
                
                if (mid_price > price) {
                    min_yield = mid_yield;
                    low_price = bond_price(bond, max_yield, vd);
                } 
                else if (mid_price < price) {
                    max_yield = mid_yield;
                    high_price = bond_price(bond, min_yield, vd);
                }
            }
            
            return mid_yield;
        }
        
        // CREATE API
        
        finAPI = {
            full_years: function(maturity){ return full_years(maturity); },
            bond_price: function(bond, Y, vd){ return bond_price(bond, Y, vd); },
            bond_yield: function(bond, price, min_yield, max_yield, vd){ 
                return bond_yield(bond, price, min_yield, max_yield, vd);  
            }
        }
       
       return finAPI;
       
   }()); 
});