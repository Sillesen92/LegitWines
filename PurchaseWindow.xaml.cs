using LegitWines.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace LegitWines
{
    /// <summary>
    /// Interaction logic for PurchaseWindow.xaml
    /// </summary>
    public partial class PurchaseWindow : Window
    {
        User userLoggedIn;
        public PurchaseWindow(User user)
        {
            InitializeComponent();
            decimal totalPurchase = 0M;
            userLoggedIn = user;
            foreach(Purchase purchase in userLoggedIn.Purchases)
            {
                PurchaseBox.Items.Add(purchase);
                totalPurchase += purchase.Wine.Price;
            }
            TotalPurchaseBox.Text = totalPurchase.ToString();
        }

        private void CloseWindowButton_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
