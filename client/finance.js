Meteor.startup(function(){
   Fin = (function(){
       
       finAPI = {};
       
        // FINANCIAL FUNCTIONS
        
        var full_years = function(maturity) {
            var today = new Date();
            var bMat = new Date(maturity);
            var counter = 0;
            
            while (bMat > today) {
                bMat.setFullYear( bMat.getFullYear() - 1); // decrease by one year
                counter += 1;
            }
            
            return counter - 1;
        }
    
        // bond is an object containing: 
        // bYield - yield
        // maturity, coupon
        // coupon_accuracy - to how many places accrued interest are rounded
        var bond_price = function(bond, Y, vd) {
            var y =         Y/100, // yield from 3 to 0.03
                m =         bond.maturity,
                c =         bond.coupon,
                coupon_accuracy = bond.coupon_accuracy;
                
            var one_day = 24*60*60*1000;
            var full_years_to_maturity = full_years(m);
            var next_coupon_date = new Date(m.getFullYear() - full_years_to_maturity, m.getMonth(), m.getDate() );
            var last_coupon_date = new Date(next_coupon_date.getFullYear() - 1, next_coupon_date.getMonth(), next_coupon_date.getDate());
            
            // base is calculated only  for current not full year till next coupon payment
            var base = Math.round((next_coupon_date - last_coupon_date)/one_day);
            
            var days_to_coupon = Math.round((next_coupon_date - vd)/one_day);
            var days_from_last_coupon = Math.round((vd - last_coupon_date)/one_day);
            var accrued_interest = Math.round(1000 * c * days_from_last_coupon/base)/1000;
              
            var dsc_coupons = c/y*(1-1/Math.pow(1+y, full_years_to_maturity));
            var dsc_capital = 100/(Math.pow(1+y, full_years_to_maturity));
            
            var price = (dsc_coupons + c + dsc_capital)/(Math.pow(1+y, days_to_coupon/base)) - accrued_interest;
            
            return price;
        }
        
        
        // Bond yield is calculated to accrued_interest accuracy
        // 
        var bond_yield = function(bond, price, min_yield, max_yield, vd) {
                
            
            var low_price =     bond_price(bond, max_yield, vd),
                high_price =    bond_price(bond, min_yield, vd),
                accuracy =      bond.couponAccuracy,
                mid_yield,
                mid_price;
                

            while (Math.round(Math.abs(low_price - high_price)*1000) !== 0) {
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