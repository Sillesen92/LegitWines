using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LegitWines.Model
{
    public class User
    {
        public string Name { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<Purchase> Purchases { get; set; } = new List<Purchase>();
        public bool IsAdmin { get; set; }

        public User(string name, string username, string password, bool isAdmin)
        {
            Name = name;
            Username = username;
            Password = password;
            IsAdmin = isAdmin;
        }

        public void CreatePurchase(Wine wine)
        {
            Purchases.Add(new Purchase(this, wine));
        }
    }
}
