import { supabase } from "@/src/lib/supabase"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient()

    useEffect(() => {
        const ordersSubscription = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'orders',
                },
                (payload) => {
                    queryClient.invalidateQueries(['orders'])
                } 
            )
            .subscribe()

        return () => {
            ordersSubscription.unsubscribe()
        }
    }, [])
}

export const useUpdateOrderSubscription = (id: number) => {
    const queryClient = useQueryClient()

    useEffect(() => {
        const orders = supabase
            .channel('custom-filter-channel')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${id}`
                },
                (payload) => {
                    queryClient.invalidateQueries(['orders', id])
                }
            )
            .subscribe()
        
        return () => {
            orders.unsubscribe()
        }
    }, [])
}