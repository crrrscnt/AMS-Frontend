import { mockSpaceObjects } from './mock.ts'

export interface SpaceObject {
  id: number;
  name: string;
  description: string;
  image_url: string;
}

export interface SpaceObjectResult {
  resultCount: number;
  results: SpaceObject[];
}

export const getSpaceObjectByName = async (
  query = ''
): Promise<SpaceObjectResult> => {
  const response = await fetch(`http://localhost:3000/api/spaceobjects/?object_search=${query}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return {
    resultCount: data['space objects in spacecraft'] || 0,
    results: data['space objects'] || [],
  };
}

export const getSpaceObjectById = async (
  id: number | string
): Promise<SpaceObject | null> => {

  try {
    const response = await fetch(`/api/spaceobjects/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching space object.  GET MOCK-OBJECT', error);
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    return mockSpaceObjects['space objects'].find(obj => obj.id === numericId) || null;
  }
};