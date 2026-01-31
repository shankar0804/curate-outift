import { supabaseService } from './supabase';
import { ApiService } from './interface';

// Default implementation is Supabase
// This allows for easy switching or dependency injection later
export const api: ApiService = supabaseService;

export * from './types';
export * from './interface';
