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
    /// Interaction logic for AdminWindow.xaml
    /// </summary>
    public partial class AdminWindow : Window
    {
        MainWindow mainWindow;
        public AdminWindow(MainWindow main)
        {
            InitializeComponent();
            mainWindow = main;
        }

        private void UserCloseAndSaveButton_Click(object sender, RoutedEventArgs e)
        {
            AlertLabel.Content = "";
            if (UserNameBox.Text != "" && UserUsernameBox.Text != "" && UserPasswordBox.Text != "")
            {
                mainWindow.Database.Users.Add(new User(UserNameBox.Text, UserUsernameBox.Text, UserPasswordBox.Text, (bool)UserIsAdminCheck.IsChecked));
                AlertLabel.Content = "";
                this.Close();
            }
            else
            {
                AlertLabel.Content = "Please fill out all the textinput boxes";
            }
        }

        private void UserCloseButton_Click(object sender, RoutedEventArgs e)
        {
            AlertLabel.Content = "";
            this.Close();
        }
    }
}
