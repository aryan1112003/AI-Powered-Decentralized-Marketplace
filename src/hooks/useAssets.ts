import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Asset } from '../types';

export function useAssets(category: string = 'all') {
  return useQuery({
    queryKey: ['assets', category],
    queryFn: async () => {
      const query = supabase
        .from('assets')
        .select(`
          *,
          creator:creator_id(id, email),
          likes:asset_likes(count),
          views:asset_views(count)
        `)
        .order('created_at', { ascending: false });

      if (category !== 'all') {
        query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Asset[];
    },
  });
}

export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (asset: Omit<Asset, 'id' | 'creator_id' | 'created_at' | 'likes' | 'views'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('assets')
        .insert({
          ...asset,
          creator_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
}

export function useLikeAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assetId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('asset_likes')
        .insert({
          asset_id: assetId,
          user_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
}

export function useViewAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assetId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('asset_views')
        .insert({
          asset_id: assetId,
          user_id: user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assets'] });
    },
  });
}