// External Import
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CompactPicker } from 'react-color';
import JoditEditor from 'jodit-react';
import { FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

// Internal Import
import { categories, subCategories } from '../../data/category';
import LoadingIcon from '../../assets/loading.gif';
import { priceConverter } from '../../utils/helpers';
import { updateProduct } from '../../redux/actions/sellerActions';

const FullPageBackground = styled.div`
  position: fixed;
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
const ModalBox = styled.div`
  background: white;
  border-radius: 3px;
  border: 1.3px solid #dbdbdb;
  width: 80%;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 90%;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #dddddd;
  }
  &::-webkit-scrollbar-thumb {
    background: #acaaaa;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #c2c2c2;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
`;
const ModalBoxTop = styled.div`
  padding: 3px 8px;
  border-bottom: 1.3px solid #dbdbdb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  transition: 0.3s;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #dedede;
  }
`;
const ModalBoxTitle = styled.h5`
  font-weight: bold;
  margin: 0;
  padding: 0;
  margin-top: 2px;
`;
const ModalBoxInner = styled.div`
  padding: 5px 8px;
`;
const Labels = styled.label`
  font-weight: 500;
`;
const InputField = styled.input`
  padding: 4px 12px;
  border-radius: 3px;
  background: #efefef;
  border: 1px solid #c2c2c2;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;
const Select = styled.select`
  padding: 4px 5px;
  border-radius: 3px;
  background: #efefef;
  border: 1px solid #c2c2c2;
  width: 90%;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;
const RemoveIcon = styled.span`
  color: white;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  bottom: -6px;
  left: 3px;
  text-shadow: -1px -1px black;
  visibility: hidden;
`;
const ColorPreview = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  cursor: pointer;
  display: inline-block;
  margin: 1px;
  border: 1px solid black;
  position: relative;
  &:hover {
    ${RemoveIcon} {
      visibility: visible;
    }
  }
`;
const ColorOptions = styled.div`
  margin-left: 20px;
  @media (max-width: 512px) {
    margin-left: 0;
  }
`;
const DisplayImages = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #dbdbdb;
  margin-top: 10px;
`;
const ImageItem = styled.img`
  border: 1px solid #dbdbdb;
  height: 100px;
  width: 100%;
  object-fit: contain;
  cursor: pointer;
  margin-bottom: 20px;
`;
const ImageBox = styled.div`
  display: inline-block;
  position: relative;
`;
const RemoveImageButton = styled.button`
  font-size: 14px;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 15px;
  top: 0;
  border-radius: 50%;
  background: #dbdbdb;
  width: 20px;
  height: 20px;
  border: none;

  &:focus {
    outline: 0;
  }
`;

const UpdateProductModal = ({ setIsUpdateProductModalOpen, Product }) => {
  const [name, setName] = useState(Product.title);
  const [category, setCategory] = useState(Product.category);
  const [subCategory, setSubCategory] = useState(Product.subCategory);
  const [colors, setColors] = useState(Product.colors[0].split(','));
  const [description, setDescription] = useState(Product.description);
  const [brand, setBrand] = useState(Product.brand);
  const [location, setLocation] = useState(Product.location);
  const [color, setColor] = useState('');
  const editor = useRef(null);
  const [notFound, setNotFound] = useState(null);
  const [price, setPrice] = useState(Product.price);
  const [stock, setStock] = useState(Product.stock);
  const [images, setImages] = useState(Product.images);
  const config = {
    readonly: false,
    placeholder: 'Write product description...',
    askBeforePasteHTML: false
  };
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.Seller);

  useEffect(() => {
    window.addEventListener(
      'keydown',
      e => e.key === 'Escape' && setIsUpdateProductModalOpen(false)
    );
  }, [setIsUpdateProductModalOpen]);

  const editProduct = e => {
    e.preventDefault();
    let formData = new FormData();
    const imageFile = document.querySelector(`input[type='file']`);
    if (imageFile.files) {
      for (let i = 0; i < imageFile.files.length; i++) {
        formData.append('images', imageFile.files[i]);
      }
    }
    formData.append('title', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('stock', stock);
    formData.append('brand', brand);
    formData.append('colors', colors);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('oldImages', JSON.stringify(images));

    dispatch(updateProduct(Product._id, formData));
    setIsUpdateProductModalOpen(false);
  };
  const handleChangeComplete = color => {
    setColor(color.hex);
    setColors(oldColors => {
      if (colors.indexOf(color.hex) === -1) {
        return [color.hex, ...oldColors];
      } else {
        return [...oldColors];
      }
    });
  };
  const removeColor = clr => {
    setColors(colors.filter(item => item !== clr));
  };
  const removeImage = img => {
    setImages(images.filter(item => item._id !== img._id));
  };

  return (
    <FullPageBackground>
      <ModalBox>
        <ModalBoxTop>
          <ModalBoxTitle>Edit Product</ModalBoxTitle>
          <CloseButton onClick={() => setIsUpdateProductModalOpen(false)}>
            <FaTimes />
          </CloseButton>
        </ModalBoxTop>
        <ModalBoxInner>
          <form onSubmit={e => editProduct(e)}>
            <div className='row'>
              <div className='col-12'>
                <div className='form-section'>
                  <Labels htmlFor='name'>Product Name</Labels>
                  <InputField
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Product Name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className='col-md-4 mb-2 mt-2'>
                <Labels htmlFor='category'>Select Category</Labels>
                <Select
                  name='category'
                  id='category'
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  <option value=''>Select Category</option>
                  {categories.map((item, idx) => {
                    return (
                      <option value={item} key={idx}>
                        {item}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className='form-section col-md-4 mb-2 mt-2'>
                <Labels htmlFor='subCategory'>Select Sub Category</Labels>
                <Select
                  name='subCategory'
                  id='subCategory'
                  value={subCategory}
                  onChange={e => setSubCategory(e.target.value)}
                  required
                >
                  <option value=''>Select Sub Category</option>
                  {category !== '' &&
                    subCategories[categories.indexOf(category)].map((item, idx) => {
                      return (
                        <option value={item} key={idx}>
                          {item}
                        </option>
                      );
                    })}
                </Select>
              </div>
              <div className='form-section col-md-4 mb-2 mt-2'>
                <Labels htmlFor='stock'>Stock</Labels>
                <InputField
                  id='stock'
                  type='number'
                  placeholder='Stock'
                  value={stock}
                  onChange={e => setStock(e.target.value)}
                  min='0'
                />
              </div>
              <div className='form-section col-md-6 mb-2 mt-2'>
                <Labels htmlFor='brand'>Brand Name</Labels>
                <InputField
                  type='text'
                  name='brand'
                  id='brand'
                  value={brand}
                  placeholder='Brand Name'
                  onChange={e => setBrand(e.target.value)}
                  required
                />
              </div>
              <div className='form-section col-md-6 mb-2 mt-2'>
                <Labels htmlFor='price'>Price ({priceConverter(price)})</Labels>
                <InputField
                  id='price'
                  type='number'
                  placeholder='Price'
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  min='1'
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start'
              }}
            >
              <div>
                <Labels htmlFor='colorPicker'>Pick Color Options For Product</Labels>
                <br />
                <span className='form-text' style={{ marginTop: '-5px' }}>
                  Picked colors will be displayed on right.
                </span>
                <br />
                <CompactPicker
                  id='colorPicker'
                  color={color}
                  onChange={color => handleChangeComplete(color)}
                />
              </div>
              <ColorOptions>
                <p style={{ fontWeight: '500' }}>Picked Colors:</p>
                <span style={{ marginTop: '-15px', display: 'block' }} className='form-text'>
                  Colors gets removed on click
                </span>
                <br />
                {colors.length > 0 &&
                  colors.map((clr, idx) => {
                    return (
                      <ColorPreview
                        style={{ background: clr }}
                        onClick={() => removeColor(clr)}
                        key={idx}
                        id={`clr${clr.substring(1, clr.length)}`}
                      >
                        <RemoveIcon>&times;</RemoveIcon>
                      </ColorPreview>
                    );
                  })}
              </ColorOptions>
            </div>
            <Labels htmlFor='description' className='mt-3'>
              Description
            </Labels>
            <JoditEditor
              id='description'
              ref={editor}
              value={description}
              config={config}
              tabIndex={1}
              onBlur={newContent => setDescription(newContent)}
            />
            <section className='form-section'>
              <Labels htmlFor='images' className='mt-3'>
                Choose Product Images
              </Labels>
              <input
                className='form-control'
                type='file'
                id='images'
                multiple
                required={images.length > 0 ? false : true}
              />
              <DisplayImages>
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    padding: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    borderBottom: '1px solid #dbdbdb',
                    width: '100%'
                  }}
                >
                  <span>
                    Selected Images{' '}
                    <span style={{ fontSize: '13px', fontWeight: 'normal' }}>
                      (click on image to remove)
                    </span>
                  </span>
                </div>
                <div className='row' style={{ padding: '10px', marginTop: '35px' }}>
                  {images.length > 0 &&
                    images.map((img, index) => {
                      return (
                        <ImageBox
                          key={index}
                          className='col-md-2 col-sm-4 col-6'
                          onClick={() => removeImage(img)}
                        >
                          <ImageItem src={img.url} alt='selected img' />
                          <RemoveImageButton type='button'>
                            <FaTimes />
                          </RemoveImageButton>
                        </ImageBox>
                      );
                    })}
                </div>
              </DisplayImages>
            </section>
            <div className='form-section mt-3'>
              <Labels htmlFor='location'>Enter Location Of Product</Labels>
              <InputField
                type='text'
                name='location'
                id='location'
                aria-label='location'
                placeholder='Location'
                value={location}
                onChange={e => setLocation(e.target.value)}
                autoComplete='off'
                required
              />
              <div className='form-text text-danger'>{notFound && 'No address found'}</div>
            </div>
            <button className='default-btn mt-4'>Edit Product</button>
            {loading && (
              <>
                <img src={LoadingIcon} alt='loading gif' height='70px' />
                <p className='text-muted'>This may take a while.</p>
              </>
            )}
            {error.message && (
              <>
                <p className='text-danger' style={{ fontSize: '14px' }}>
                  {error.message}
                </p>
              </>
            )}
          </form>
        </ModalBoxInner>
      </ModalBox>
    </FullPageBackground>
  );
};

export default UpdateProductModal;
