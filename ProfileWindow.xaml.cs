using LegitWines.DAL;
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
    /// Interaction logic for ProfileWindow.xaml
    /// </summary>
    public partial class ProfileWindow : Window
    {
        User loggedInUser;
        public ProfileWindow(User user)
        {
            InitializeComponent();
            loggedInUser = user;
            OuterStack.DataContext = loggedInUser;
            //NameBox.Text = user.Name;
            //UserNameBox.Text = user.Username;
            //PasswordBox.Text = user.Password;
        }

        private void SaveAndCloseButton_Click(object sender, RoutedEventArgs e)
        {
            AlertLabel.Content = "";
            if(NameBox.Text != "" && UserNameBox.Text != "" && PasswordBox.Text != "")
            {
                //loggedInUser.Name = NameBox.Text;
                //loggedInUser.Username = UserNameBox.Text;
                //loggedInUser.Password = PasswordBox.Text;
                AlertLabel.Content = "";
                this.Close();
            }
            else
            {
                AlertLabel.Content = "Please fill out all the textboxes";
            }
            
        }

        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            AlertLabel.Content = "";
            this.Close();
        }
    }
}
