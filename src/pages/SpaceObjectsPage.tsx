import React, { FC, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import './SpaceObjectsPage.css';
import { ROUTE_LABELS } from "../Routes.tsx";
import { BreadCrumbs } from "../components/BreadCrumbs";
import defaultImage from "../assets/images/default_img.jpg";
import { SpaceObject, getSpaceObjectByName } from "../modules/spaceobjectAPI.ts";
import { useAppDispatch, useAppSelector } from '../toolkit/hooks';
import { setObjectSearch } from '../toolkit/toolkitSlice';

const SpaceObjectsPage: FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.objectsearches.objectsearch);
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(filter || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchSpaceObjects = async (page: number = 1, query: string = '') => {
    setIsLoading(true);
    try {
      const url = query
        ? `/api/spaceobjects/?object_search=${query}&page=${page}`
        : `/api/spaceobjects/?page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      setSpaceObjects(data.results);
      setTotalCount(data.count);
      setNextPage(data.next);
      setPrevPage(data.previous);
      setTotalPages(Math.ceil(data.count / data.results.length));
      setCurrentPage(page);

      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set('page', page.toString());
        if (query) {
          newParams.set('object_search', query);
        } //else {
          // newParams.delete('object_search');
        //}
        return newParams;
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setSpaceObjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialQuery = searchParams.get('object_search');
    const initialPage = parseInt(searchParams.get('page') || '1', 10);
    if (initialQuery || initialPage) {
      setSearchQuery(initialQuery || '');
      fetchSpaceObjects(initialPage, initialQuery || '');
    } else {
      fetchSpaceObjects();
    }
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setSearchParams({ object_search: query });
    dispatch(setObjectSearch(query));
    fetchSpaceObjects(1, query);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleNextPage = () => {
    if (nextPage) fetchSpaceObjects(currentPage + 1, searchQuery);
  };

  const handlePrevPage = () => {
    if (prevPage) fetchSpaceObjects(currentPage - 1, searchQuery);
  };

  const handleFirstPage = () => {
    if (currentPage > 1) fetchSpaceObjects(1, searchQuery);
  };

  const handleLastPage = () => {
    if (currentPage < totalPages) fetchSpaceObjects(totalPages, searchQuery);
  };

  const handleCardClick = (id: number) => {
    navigate(`/spaceobjects/${id}/`);
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <Spinner animation="border" variant="dark" />
      </div>
    );
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
          placeholder={filter || 'Поиск'}
        />
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {spaceObjects.map((object) => (
          <Col key={object.id}>
            <Card className="card text-start clickable-card" onClick={() => handleCardClick(object.id)}>
              <Card.Img variant="top" src={object.image_url || defaultImage} />
              <Card.Body>
                <Card.Title>{object.name}</Card.Title>
                <Card.Text>{object.description.split(' ').slice(0, 10).join(' ')}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <Row className="row">
        {spaceObjects.map((object) => (
          <Col key={object.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            <Card className="card text-start clickable-card" onClick={() => handleCardClick(object.id)}>
              <Card.Img variant="top" src={object.image_url || defaultImage} />
              <Card.Body>
                <Card.Title>{object.name}</Card.Title>
                <Card.Text>{object.description.split(' ').slice(0, 10).join(' ')}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row> */}


      <div className="pagination-container">
        <button
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          className="pagination-button">
          &laquo; {/* << */}
        </button>
        <button
          onClick={handlePrevPage}
          disabled={!prevPage}
          className="pagination-button">
          &lt; {/* < */}
        </button>
        <span>Страница {currentPage} из {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={!nextPage}
          className="pagination-button">
          &gt; {/* > */}
        </button>
        <button
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          className="pagination-button">
          &raquo; {/* >> */}
        </button>
      </div>
    </div>
  );
};

export default SpaceObjectsPage;
