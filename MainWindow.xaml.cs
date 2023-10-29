using LegitWines.DAL;
using LegitWines.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace LegitWines
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public DataInitializer Database { get; set; } = new DataInitializer();
        public User UserLoggedIn { get; set; }
        public MainWindow()
        {
            InitializeComponent();
            LoginWindow loginWindow = new LoginWindow(this);
            loginWindow.Show();
            //Divide the wine in type for example red and white wine
            ICollectionView view = CollectionViewSource.GetDefaultView(Database.Wine);
            view.GroupDescriptions.Add(new PropertyGroupDescription("Type"));
            view.SortDescriptions.Add(new SortDescription("Type", ListSortDirection.Ascending));
            WineListBox.ItemsSource = view;

            BuyThisWinebutton.Visibility = Visibility.Collapsed;
        }

        private void WineListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Wine selectedWine = (Wine)WineListBox.SelectedItem;
            WineNameLabel.Content = "";
            WineDetailBox.Items.Clear();
            GrapesBox.Items.Clear();
            if (selectedWine != null)
            {
                BuyThisWinebutton.Visibility= Visibility.Visible;
                WineNameLabel.Content = selectedWine.Name;
                WineDetailBox.Items.Add(selectedWine);
                foreach (string grape in selectedWine.Grapes)
                {
                    GrapesBox.Items.Add(grape);
                }
                BitmapImage image;
                ImageBrush brush;
                switch (selectedWine.Type)
                {
                    case "Red":
                        GrapesBox.Background = new SolidColorBrush(Color.FromRgb(155, 14, 39));
                        WineDetailBox.Background = new SolidColorBrush(Color.FromRgb(155, 14, 39));
                        GrapesBox.Foreground = new SolidColorBrush(Color.FromRgb(255, 255, 255));
                        WineDetailBox.Foreground = new SolidColorBrush(Color.FromRgb(255, 255, 255));
                        break;
                    case "White":
                        GrapesBox.Background = new SolidColorBrush(Color.FromRgb(238, 237, 196));
                        WineDetailBox.Background = new SolidColorBrush(Color.FromRgb(238, 237, 196));
                        GrapesBox.Foreground = new SolidColorBrush(Color.FromRgb(0, 0, 0));
                        WineDetailBox.Foreground = new SolidColorBrush(Color.FromRgb(0, 0, 0));
                        break;
                    case "Rose":
                        GrapesBox.Background = new SolidColorBrush(Color.FromRgb(244, 196, 187));
                        WineDetailBox.Background = new SolidColorBrush(Color.FromRgb(244, 196, 187));
                        GrapesBox.Foreground = new SolidColorBrush(Color.FromRgb(0, 0, 0));
                        WineDetailBox.Foreground = new SolidColorBrush(Color.FromRgb(0, 0, 0));
                        break;
                    default:
                        break;
                }
                switch (selectedWine.Country)
                {
                    case "Australia":
                        image = new BitmapImage(new Uri(Environment.CurrentDirectory + @"..\..\..\Images\Australien.png"));
                        brush = new ImageBrush(image);
                        FlagLabel.Background = brush;
                        break;
                    case "France":
                        image = new BitmapImage(new Uri(Environment.CurrentDirectory + @"..\..\..\Images\France.png"));
                        brush = new ImageBrush(image);
                        FlagLabel.Background = brush;
                        break;
                    case "Italy":
                        image = new BitmapImage(new Uri(Environment.CurrentDirectory + @"..\..\..\Images\Italien.png"));
                        brush = new ImageBrush(image);
                        FlagLabel.Background = brush;
                        break;
                    case "Spain":
                        image = new BitmapImage(new Uri(Environment.CurrentDirectory + @"..\..\..\Images\Spanien.png"));
                        brush = new ImageBrush(image);
                        FlagLabel.Background = brush;
                        break;
                    case "South Africa":
                        image = new BitmapImage(new Uri(Environment.CurrentDirectory + @"..\..\..\Images\Sydafrika.png"));
                        brush = new ImageBrush(image);
                        FlagLabel.Background = brush;
                        break;
                    case "USA":
                        image = new BitmapImage(new Uri(Environment.CurrentDirectory + @"..\..\..\Images\USA.png"));
                        brush = new ImageBrush(image);
                        FlagLabel.Background = brush;
                        break;
                    default:
                        brush = null;
                        FlagLabel.Background = brush;
                        break;
                }
            }
        }

        private void BuyThisWinebutton_Click(object sender, RoutedEventArgs e)
        {
            if(WineListBox.SelectedItem != null)
            {
                UserLoggedIn.CreatePurchase((Wine)WineListBox.SelectedItem);
                WineListBox.SelectedItem = null;
                GrapesBox.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
                WineDetailBox.Background = new SolidColorBrush(Color.FromRgb(255, 255, 255));
                GrapesBox.Foreground = new SolidColorBrush(Color.FromRgb(0, 0, 0));
                WineDetailBox.Foreground = new SolidColorBrush(Color.FromRgb(0, 0, 0));
                FlagLabel.Background= new SolidColorBrush(Color.FromRgb(255, 255, 255));
                BuyThisWinebutton.Visibility = Visibility.Collapsed;
            }
        }

        private void Logout_Click(object sender, RoutedEventArgs e)
        {
            UserLoggedIn = null;
            LoginWindow loginWindow = new LoginWindow(this);
            loginWindow.Show();
        }

        private void Purchases_Click(object sender, RoutedEventArgs e)
        {
            PurchaseWindow purchaseWindow = new PurchaseWindow(UserLoggedIn);
            purchaseWindow.Show();
        }

        private void Profile_Click(object sender, RoutedEventArgs e)
        {
            ProfileWindow profileWindow = new ProfileWindow(UserLoggedIn);
            profileWindow.Show();
        }

        private void Admin_Click(object sender, RoutedEventArgs e)
        {
            AdminWindow adminWindow = new AdminWindow(this);
            adminWindow.Show();
        }
    }
}
