import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "@/src/types";

export const useInsertOrderItems = () => {
    const queryClient = useQueryClient()

    return useMutation({
        async mutationFn(items: InsertTables<'order_items'>[]) {
            const { error, data: newOrder } = await supabase
                .from('order_items')
                .insert(items)
                .select() 

            if (error) {
                throw new Error(error.message)
            }
            console.log('order: ', newOrder)
            return newOrder
        }
    })
}