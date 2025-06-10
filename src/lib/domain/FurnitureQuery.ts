// lib/domain/FurnitureQuery.ts

import { createAxiosClient } from "../infrastructure/AxiosClient";

export type Furniture = {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  description?: string;
};
