import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/productsSlice';
import "./Shop.css";

const images = import.meta.glob('../../assets/*.jpg', { eager: true, query: '?url' });

const Shop = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="padding_div">
      <h1 className="title">Shop Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="container">
        {items.map(product => {
          const imgSrc = images[`../../assets/${product.image}`] as string | undefined;
          return (
            <div key={product.doc_id} className='product_item'>
              <img src={imgSrc || ''} alt={product.name} className="cover_photo" />
              <h2 className="item_title">{product.name}</h2>
              <p style={{display:"inline-block"}}><b>Type:</b> {product.type}</p>
              <p style={{display:"inline-block", marginLeft: "20px"}}><b>Price:</b> {product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;