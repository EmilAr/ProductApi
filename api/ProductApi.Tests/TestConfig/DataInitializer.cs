using ProductApi.Model.DatabaseContext;
using ProductApi.Model.Entities;

namespace ProductApi.Tests.TestConfig
{
    public class DataInitializer
    {
        private readonly ApplicationDbContext context;

        public DataInitializer(ApplicationDbContext context)
        {
            this.context = context;
        }

        /// <summary>
        /// Initialize n products
        /// </summary>
        public void InitializeData(int size)
        {
            for (int i = 0; i < size; i++)
            {
                context.Add(new Product
                {
                    Name = $"Product{i + 1}",
                    Description = $"Description for product {i + 1}"
                });
            }
            context.SaveChanges();
        }
    }
}
