
using API.Infrastructure.DataContext;
using API.Core.DbModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Core.Interfaces;
using API.Core.Specificatios;
using API.Dtos;
using AutoMapper;
using API.Helpers;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
       // private readonly IProductRepository _producttRepository;

        private readonly IGenericRepository<Product> _productRepository;
        private readonly IGenericRepository<ProductBrand> _productBrandRepository;
        private readonly IGenericRepository<ProductType> _productTypeRepository;
        private readonly IMapper _mapper;
        public ProductsController(StoreContext context,IGenericRepository<Product> productRepository,
            IGenericRepository<ProductBrand> productBrandRepository,
            IGenericRepository<ProductType> productTypeRepository,
            IMapper mapper)
        {
           _context = context;  
            _productRepository = productRepository;
            _productBrandRepository = productBrandRepository;
            _productTypeRepository = productTypeRepository;
            _mapper =   mapper;
        }
        [HttpGet]
        public async Task<ActionResult<Pagination<ProductToReturnDto>>> GetProducts([FromQuery]ProductSpecParams productSpecParams)
        {
            //[FromQuery] urlden çek bodyden değil
            var spec = new ProductsWithProductTypeAndBrandSpecification(productSpecParams);
            var countSpec = new ProductWithFiltersForCountSpecification(productSpecParams);
            var totalItems = await _productRepository.CountAsync(spec);
            var products = await _productRepository.ListAsyncs(spec) ;
            var data = _mapper.Map<List<Product>, List<ProductToReturnDto>>(products);


            return Ok(new Pagination<ProductToReturnDto>(productSpecParams.PageIndex,productSpecParams.PageSize,totalItems,data));
        }

        [HttpGet("GetProduct/{id}")]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
        {
            var spec = new ProductsWithProductTypeAndBrandSpecification(id);
            var product = await _productRepository.GetEntityWithSpec(spec);


            return _mapper.Map<Product, ProductToReturnDto>(product);
        }
        [HttpGet("GetProductBrands/{brands}")]
        public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
        {
            var productBrands = await _productBrandRepository.ListAllAsync();

            return Ok(productBrands);
        }
        [HttpGet("GetProducTypes/{types}")]
        public async Task<ActionResult<List<ProductType>>> GetProducTypes()
        {
            var productTypes = await _productTypeRepository.ListAllAsync();

            return Ok(productTypes);
        }
    }
}
