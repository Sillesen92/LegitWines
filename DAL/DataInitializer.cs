using LegitWines.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LegitWines.DAL
{
    public class DataInitializer
    {
        //Some wine
        public List<Wine> Wine = new List<Wine>();
        //Some users
        public List<User> Users = new List<User>();

        public DataInitializer()
        {
            initializeDatabase();
        }

        public void initializeDatabase()
        {
            //White wine 
            Wine w1 = new Wine("Domaine Laroche", "Best served with fisk or shellfish", "White", "France", "Bourgogne", 12.5, 2019, 219.00M);
            w1.AddGrape("Chardonnay");
            Wine w2 = new Wine("Radford-Dale", "Best served with fish or poultry", "White", "South Africa", "Stellenbosch", 11.5, 2018, 159.00M);
            w2.AddGrape("Chardonnay");
            Wine w3 = new Wine("Chateau Ste Michelle", "Best served with aperitifs, fish or shellfish", "White", "USA", "Washington State", 12.00, 2019, 169.00M);
            w3.AddGrape("Riesling");
            //Red wine
            Wine w4 = new Wine("Villa Susti", "Best served with red meat", "Red", "Italy", "Piemonte", 15.00, 2016, 179.00M);
            w4.AddGrape("Barbera");
            Wine w5 = new Wine("Ben Glaetzer", "Best served with spicy dishes, dark meat or strong cheese", "Red", "Australia", "Barossa Valley", 14.50, 2018, 149.00M);
            w5.AddGrape("Grenache Noir");
            w5.AddGrape("Syrah");
            Wine w6 = new Wine("Borsao Bolé", "Best served with red meat", "Red", "Spain", "Campo de Borja", 15.00, 2017, 75.00M);
            w6.AddGrape("Grenache");
            w6.AddGrape("Shiraz");
            //Rose wine
            Wine w7 = new Wine("Vacheron", "Best served with aperitifs, fish or shellfish", "Rose", "France", "Loire", 13.00, 2019, 279.00M);
            w7.AddGrape("Pinot Noir");
            Wine w8 = new Wine("Lucia Bosio", "Best served with dessert, drinks or friut", "Rose", "Italy", "Piemonte", 5.00, 2021, 50.00M);
            w8.AddGrape("Brachetto");
            w8.AddGrape("Moscato Bianco");
            Wine w9 = new Wine("Cara Norte", "Best served with aperitifs, fish or shellfish", "Rose", "Spain", "Penedes", 12.00, 2020, 149.00M);
            w9.AddGrape("Trepat");

            Wine.Add(w1);
            Wine.Add(w2);
            Wine.Add(w3);
            Wine.Add(w4);
            Wine.Add(w5);
            Wine.Add(w6);
            Wine.Add(w7);
            Wine.Add(w8);
            Wine.Add(w9);

            //Users
            User u1 = new User("Jonas Sillesen", "Jonas", "Sillesen", false);
            User u2 = new User("Administrator", "Admin", "Admin", true);

            Users.Add(u1);
            Users.Add(u2);

            //Purchases
            u1.CreatePurchase(w1);
            u1.CreatePurchase(w2);
            u1.CreatePurchase(w3);

            //Change the datetime of the purchases
            u1.Purchases[0].DateOfPurchase = new DateTime(2022, 4, 17, 14, 13, 18);
            u1.Purchases[1].DateOfPurchase = new DateTime(2022, 4, 18, 16, 2, 37);
            u1.Purchases[2].DateOfPurchase = new DateTime(2022, 4, 19, 20, 14, 58);

            //Sort the lists alphabetic
            Wine.Sort((a, b) => a.Name.CompareTo(b.Name));
            Users.Sort((a, b) => a.Username.CompareTo(b.Username));
        }
    }
}
