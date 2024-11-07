import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import './SpaceObjectsPage.css';
import { mockSpaceObjects } from '../modules/mock';
import { BreadCrumbs } from "../components/BreadCrumbs";
import { ROUTE_LABELS } from "../Routes.tsx";
import defaultImage from "../assets/images/default_img.jpg"
import { SpaceObject } from "../modules/spaceobjectAPI.ts";
import { useAppDispatch, useAppSelector } from '../toolkit/hooks';
import { setObjectSearch } from '../toolkit/toolkitSlice';

const SpaceObjectsPage = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.objectsearches.objectsearch); // Get current search filter from Redux
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);
  const [allSpaceObjects, setAllSpaceObjects] = useState<SpaceObject[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(filter || ''); // Set initial searchQuery from Redux state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchSpaceObjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/proxy/spaceobjects/`);
        const data = await response.json();
        setAllSpaceObjects(data['space objects']);
        setSpaceObjects(data['space objects']);
      } catch (error) {
        console.error('.:Error fetching data:. -->> GET MOCK-OBJECT <<--', error);
        setAllSpaceObjects(mockSpaceObjects['space objects']);
        setSpaceObjects(mockSpaceObjects['space objects']);
      } finally {
        setIsLoading(false);
      }
    };

    const initialQuery = searchParams.get('object_search');
    if (initialQuery) {
      setSearchQuery(initialQuery);
      handleSearch(initialQuery); // Load results if there's a query
    } else {
      fetchSpaceObjects();
    }
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSearchParams({ object_search: query });
    dispatch(setObjectSearch(query)); // Dispatch to Redux store

    if (!query) {
      setSpaceObjects(allSpaceObjects);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/proxy/spaceobjects/?object_search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSpaceObjects(data['space objects']);
    } catch (error) {
      console.error('.:Error fetching search results:', error);
      // setSpaceObjects(mockSpaceObjects['space objects']);
      // + Поиск по mock-объектам
      const filteredMockObjects = mockSpaceObjects['space objects'].filter(object =>
        object.name.toLowerCase().includes(query.toLowerCase())
      );
      setSpaceObjects(filteredMockObjects);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleCardClick = (id: number) => {
    navigate(`/spaceobjects/${id}/`);
  };

  if (isLoading) {
    return <Spinner animation="border" variant="dark" />;
  }

  return (
    <div className="container">
      <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.SPACEOBJECTS }]} />

      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={filter || 'Поиск'} // Use Redux filter value as placeholder if available
        />
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {spaceObjects.map((object) => (
          <Col key={object.id}>
            <Card className="card text-start clickable-card" onClick={() => handleCardClick(object.id)}>
              <Card.Img variant="top" src={object.image_url || defaultImage} />
              <Card.Body>
                <Card.Title>{object.name}</Card.Title>
                <Card.Text>{object.description.split(' ').slice(0, 16).join(' ')}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SpaceObjectsPage;