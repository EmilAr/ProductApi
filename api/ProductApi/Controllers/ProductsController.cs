using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ProductApi.Model.Dtos;
using ProductApi.Model.Entities;
using ProductApi.Services;

namespace ProductApi.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsAllowAny")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ProductService productService;

        public ProductsController(IMapper mapper, ProductService productService)
        {
            this.mapper = mapper;
            this.productService = productService;
        }


        // GET api/products
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(mapper.Map<IEnumerable<Product>, IEnumerable<ProductDto>>(productService.GetAllProducts()));
        }

        // GET api/products/5
        [HttpGet("{id}", Name = "GetProduct")]
        public IActionResult Get([FromRoute] long id)
        {
            return Ok(mapper.Map<ProductDto>(productService.GetProduct(id)));
        }

        // POST api/products
        [HttpPost]
        public IActionResult Post([FromBody] ProductDto productDto)
        {
            if (productDto == null || productDto.Id != default(long))
                return BadRequest();

            var product = mapper.Map<Product>(productDto);
            productService.SaveProduct(product);
            var resultDto = mapper.Map<ProductDto>(product);

            return CreatedAtRoute("GetProduct", new { id = resultDto.Id }, resultDto);
        }

        // PUT api/products/5
        [HttpPut("{id}")]
        public IActionResult Put([FromRoute] long id, [FromBody] ProductDto productDto)
        {
            if (productDto == null || productDto.Id == default(long))
                return BadRequest();

            var product = productService.GetProduct(id);
            if (product == null)
                return NotFound();

            productService.UpdateProduct(mapper.Map(productDto, product));

            return AcceptedAtRoute("GetProduct", new { id = productDto.Id }, productDto);
        }

        // DELETE api/products/5
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] long id)
        {
            var product = productService.GetProduct(id);
            
            if (product != null)
            {
                productService.DeleteProduct(product);
                return NoContent();
            }

            return NotFound();
        }
    }
}
