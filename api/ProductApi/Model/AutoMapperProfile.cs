using AutoMapper;
using ProductApi.Model.Dtos;
using ProductApi.Model.Entities;

namespace ProductApi.Model
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductDto, Product>();
        }
    }
}
