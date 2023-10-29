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
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        MainWindow main;
        public LoginWindow(MainWindow mainWindow)
        {
            InitializeComponent();
            main = mainWindow;
            main.Hide();
            UserNameBox.Focus();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            bool userNameFound = false;
            foreach (User user in main.Database.Users)
            {
                if (user.Username.Equals(UserNameBox.Text))
                {
                    userNameFound = true;
                    if (user.Password.Equals(PassBox.Password))
                    {
                        main.UserLoggedIn = user;
                        main.Username.DataContext = user;
                        //main.Username.Header = user.Name;
                        if (user.IsAdmin)
                        {
                            main.Admin.Visibility = Visibility.Visible;
                        }
                        else
                        {
                            main.Admin.Visibility = Visibility.Collapsed;
                        }
                        main.Show();
                        this.Close();
                    }
                }
            }
            if (userNameFound)
            {
                AlertLabel.Content = "The password is incorrect, try again";
                PassBox.Clear();
            }
            else
            {
                AlertLabel.Content = "The username is not in use, please write a correct one";
                UserNameBox.Clear();
                PassBox.Clear();
            }
           
            
        }

        private void Grid_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.Key == Key.Enter)
            {
                LoginButton_Click(sender, e);
            }
        }
    }
}
