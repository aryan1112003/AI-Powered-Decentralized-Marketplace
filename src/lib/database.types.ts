export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      assets: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          image: string
          category: 'NFT' | 'Data' | 'Service'
          creator_id: string
          created_at: string
          likes: number
          views: number
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          image: string
          category: 'NFT' | 'Data' | 'Service'
          creator_id: string
          created_at?: string
          likes?: number
          views?: number
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          image?: string
          category?: 'NFT' | 'Data' | 'Service'
          creator_id?: string
          created_at?: string
          likes?: number
          views?: number
        }
      }
      asset_likes: {
        Row: {
          asset_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          asset_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          asset_id?: string
          user_id?: string
          created_at?: string
        }
      }
      asset_views: {
        Row: {
          asset_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          asset_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          asset_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}