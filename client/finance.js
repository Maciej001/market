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
    
        // maturity, coupon, bond yield, base, coupon_rounding 
        // coupon_rounding is how many digital places assuming 100 notional of the bond
        var bond_price = function(mat, c, Y, coupon_rounding) {
            var y = Y/100; // yield from 3 to 0.03
            var one_day = 24*60*60*1000;
            var full_years_to_maturity = full_years(mat);
            
            var next_coupon_date = new Date(
                    mat.getFullYear() - full_years_to_maturity, 
                    mat.getMonth(), 
                    mat.getDate() );
        
            var last_coupon_date = new Date(next_coupon_date.getFullYear() - 1, 
                                            next_coupon_date.getMonth(), 
                                            next_coupon_date.getDate());
                                            
            var base = Math.round((next_coupon_date - last_coupon_date)/one_day);
    
            var this_year_base = Math.round((next_coupon_date - last_coupon_date)/one_day);
            var spot = DT.spot();
            
            var days_to_coupon = Math.round((next_coupon_date - spot)/one_day);
            var days_from_last_coupon = Math.round((spot - last_coupon_date)/one_day);
            var accrued_interest = Math.round(1000 * c * days_from_last_coupon / base)/1000;
              
            var dsc_coupons = c/y*(1-1/(1+y)^full_years_to_maturity);
            var dsc_capital = 100/(1+y)^full_years_to_maturity;
            
            
            console.log('days_from_last_coupon ', days_from_last_coupon);
            console.log('coupon ', c);
            console.log('base ', base);
            console.log('accrued_interest ', accrued_interest);
            console.log('disc_capital ', dsc_capital);
            console.log('disc coupons ', dsc_coupons);
            
            var price = (dsc_coupons + c + dsc_capital)/(1+y*next_coupon_date/base) - accrued_interest;
            
            return price;
        }
        
        // CREATE API
        
        finAPI = {
            full_years: function(maturity){ return full_years(maturity); },
            bond_price: function(mat, c, Y, base){ return bond_price(mat, c, Y, base); }
        }
       
       return finAPI;
       
   }()); 
});