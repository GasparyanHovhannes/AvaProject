import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../store/productsSlice';
import { Row, Col, Card, Spin, Alert, Typography } from 'antd';
import "./Shop.css";

const { Title, Paragraph, Text } = Typography;

const images = import.meta.glob('../../assets/*.jpg', { eager: true, as: 'url' });

const Shop = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="shop-section">
      <div className="shop-content">
        <Title level={2} className="shop-heading">
          Shop Page
        </Title>
        <Paragraph className="shop-description">
          Discover our personalized products, tailored for your unique needs.
        </Paragraph>
      </div>
      {loading && <Spin size="large" style={{ display: 'block', margin: '20px auto' }} />}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
      <Row gutter={[24, 24]} justify="center">
        {items.map(product => {
          const imgSrc = images[`../../assets/${product.image}`] as string | undefined;
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={product.doc_id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={imgSrc || ''}
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: 'cover',
                      display: 'block',
                      margin: '0 auto',
                      borderRadius: 8
                    }}
                  />
                }
              >
                <Card.Meta
                  title={
                    <span className="product-title">{product.name}</span>
                  }
                  description={
                    <>
                      <Text strong>Type:</Text> {product.type} <br />
                      <Text strong>Price:</Text> {product.price}
                    </>
                  }
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Shop;