// lib/domain/PropertyQuery.ts

import { createAxiosClient } from "../infrastructure/AxiosClient";

export type Property = {
  id: string;
  name: string;
  imageUrl: string;
  address: string;
  description?: string;
};
