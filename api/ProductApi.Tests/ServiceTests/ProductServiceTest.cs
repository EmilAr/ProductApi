using Microsoft.EntityFrameworkCore;
using ProductApi.Model.DatabaseContext;
using ProductApi.Model.Entities;
using ProductApi.Services;
using ProductApi.Tests.TestConfig;
using System.Linq;
using Xunit;

namespace ProductApi.Tests.ServiceTests
{
    public class ProductServiceTest
    {
        [Fact]
        public void AddProductTest()
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase("Add_product_to_database")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var service = new ProductService(context);
                service.SaveProduct(new Product { Id = 1, Name = "TestProduct" });
                var product = service.GetProduct(1);
                Assert.Equal("TestProduct", product.Name);
            }
        }

        [Theory]
        [InlineData(3)]
        [InlineData(5)]
        [InlineData(6)]
        public void GetProductsTest(int length)
        {
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase($"Get_{length}_products")
                .Options;

            using (var context = new ApplicationDbContext(options))
            {
                var dataInitializer = new DataInitializer(context);
                var service = new ProductService(context);
                dataInitializer.InitializeData(length);

                Assert.Equal(length, service.GetAllProducts().Count());
            }
        }
    }
}
