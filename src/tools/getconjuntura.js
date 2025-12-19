import { supabase } from '../supabase.js';

export async function getConjuntura({ termo }) {
  let query = supabase
    .from('conjuntura')
    .select('texto, updated_at')
    .order('updated_at', { ascending: false })
    .limit(1);

  // Se o usuário passar um termo, filtra no texto
  if (termo && termo.trim() !== '') {
    query = supabase
      .from('conjuntura')
      .select('texto, updated_at')
      .ilike('texto', `%${termo}%`)
      .order('updated_at', { ascending: false })
      .limit(1);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data?.[0] || null;
}
