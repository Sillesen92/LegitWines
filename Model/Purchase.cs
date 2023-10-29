using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LegitWines.Model
{
    public class Purchase
    {
        public Wine Wine { get; set; }
        public DateTime DateOfPurchase { get; set; }
        public User User { get; set; }
        
        public Purchase(User user, Wine wine)
        {
            User = user;
            Wine = wine;
            DateOfPurchase = DateTime.Now;
        }
    }
}
