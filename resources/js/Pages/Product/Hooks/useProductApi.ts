import { useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ProductType } from "../types/ProductType";

export const useProductApi = (token: string) => {
  const getProducts = useCallback(async (): Promise<ProductType[]> => {
    try {
      const response = await fetch(route("api.product"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      return data.info as ProductType[];
    } catch (error) {
      toast("Failed to fetch products.", {
        description: "There are no products listed under this account.",
      });
      return [];
    }
  }, [token]);

  const createProduct = useCallback(
    async (productData: any): Promise<void> => {
      try {
        await axios.post(route("api.product.store"), productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.info.errors;
            console.error("Validation errors:", errors);
            throw errors; // Let caller handle
          } else {
            console.error("Server error:", error.response.info);
          }
        } else {
          console.error("Network error:", error);
        }
      }
    },
    [token]
  );

  const updateProduct = useCallback(
    async (productData: any): Promise<void> => {
      try {
        await axios.put(route("api.product.update"), productData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.info.errors;
            console.error("Validation errors:", errors);
            throw errors; // Let caller handle
          } else {
            console.error("Server error:", error.response.info);
          }
        } else {
          console.error("Network error:", error);
        }
      }
    },
    [token]
  );

  const deleteProduct = useCallback(
    async (productId: number): Promise<void> => {
      try {
        await axios.delete(route("api.product.delete"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: { productId },
        });
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 422) {
            const errors = error.response.info.errors;
            console.error("Validation errors:", errors);
            throw errors; // Let caller handle
          } else {
            console.error("Server error:", error.response.info);
          }
        } else {
          console.error("Network error:", error);
        }
      }
    },
    [token]
  );

  return {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
  };
};
