using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LegitWines.Model
{
    public class Wine
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public List<String> Grapes { get; set; } = new List<String>();
        public string Country { get; set; }
        public string Area { get; set; }
        public double AlcoholPercentage { get; set; }
        public short Vintage { get; set; }
        public decimal Price { get; set; }

        public Wine(string name, string description, string type, string country, string area, double alcoholPercentage, short vintage, decimal price)
        {
            Name = name;
            Description = description;
            Type = type;
            Country = country;
            Area = area;
            AlcoholPercentage = alcoholPercentage;
            Vintage = vintage;
            Price = price;
        }

        public void AddGrape(string grape)
        {
            if (!Grapes.Contains(grape))
            {
                Grapes.Add(grape);
            }
        }

        public void RemoveGrape(string grape)
        {
            if (Grapes.Contains(grape))
            {
                Grapes.Remove(grape);
            }
        }

        public override string ToString()
        {
            return $"{Name}, {Price}DKK";
        }
    }


}
