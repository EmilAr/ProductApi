using ProductApi.Model.DatabaseContext;
using ProductApi.Model.Entities;
using System.Collections.Generic;

namespace ProductApi.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext dbContext;

        public ProductService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return dbContext.Products;
        }

        public Product GetProduct(long id)
        {
            return dbContext.Products.Find(id);
        }

        public void SaveProduct(Product product)
        {
            dbContext.Products.Add(product);
            dbContext.SaveChanges();
        }

        public void UpdateProduct(Product product)
        {
            dbContext.Update(product);
            dbContext.SaveChanges();
        }

        public void DeleteProduct(Product product)
        {
            dbContext.Remove(product);
            dbContext.SaveChanges();
        }
    }
}
