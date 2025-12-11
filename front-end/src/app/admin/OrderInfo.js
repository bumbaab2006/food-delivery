"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function OrderInfo() {
  const [orders, setOrders] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [deliveryState, setDeliveryState] = useState("pending");
  const [open, setOpen] = useState(false);

  // Fetch all orders
  useEffect(() => {
    axios.get("http://localhost:999/order-foods").then((res) => {
      setOrders(res.data);
    });
  }, []);

  // Toggle food dropdown
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Checkbox toggle
  const toggleSelect = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Status color UI
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-red-100 text-red-600 border border-red-300";
      case "delivered":
        return "bg-green-100 text-green-700 border border-green-300";
      case "cancelled":
        return "bg-gray-200 text-gray-700 border border-gray-300";
      default:
        return "";
    }
  };

  // Save new delivery state
  const updateStatus = async () => {
    try {
      await Promise.all(
        selectedOrders.map((id) =>
          axios.put(`http://localhost:999/order-foods/${id}/status`, {
            status: deliveryState,
          })
        )
      );

      // UI refresh
      const refreshed = await axios.get("http://localhost:999/order-foods");
      setOrders(refreshed.data);
      setSelectedOrders([]);
      setOpen(false);
    } catch (error) {
      console.log("Status update error:", error);
    }
  };

  return (
    <div className="p-10 w-full">
      <div className="border rounded-2xl p-6 bg-white shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Orders</h2>
            <p className="text-sm text-gray-500">{orders.length} items</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-xl">
              13 June 2023 - 14 July 2023
            </Button>

            {/* Change Delivery State Button */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={selectedOrders.length === 0}
                  className="rounded-xl bg-black text-white"
                >
                  Change delivery state
                </Button>
              </DialogTrigger>

              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Change delivery state</DialogTitle>
                </DialogHeader>

                {/* SELECT STATUS */}
                <div className="flex justify-center gap-3 my-4">
                  <Button
                    variant={
                      deliveryState === "delivered" ? "default" : "outline"
                    }
                    onClick={() => setDeliveryState("delivered")}
                    className="w-28 rounded-xl"
                  >
                    Delivered
                  </Button>

                  <Button
                    variant={
                      deliveryState === "pending" ? "default" : "outline"
                    }
                    onClick={() => setDeliveryState("pending")}
                    className="w-28 rounded-xl"
                  >
                    Pending
                  </Button>

                  <Button
                    variant={
                      deliveryState === "cancelled" ? "default" : "outline"
                    }
                    onClick={() => setDeliveryState("cancelled")}
                    className="w-28 rounded-xl"
                  >
                    Cancelled
                  </Button>
                </div>

                <DialogFooter>
                  <Button className="w-full rounded-xl" onClick={updateStatus}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ORDER TABLE */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>№</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Food</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Delivery Address</TableHead>
              <TableHead>Delivery state</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order, index) => (
              <>
                <TableRow key={order._id}>
                  {/* Checkbox */}
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order._id)}
                      onCheckedChange={() => toggleSelect(order._id)}
                    />
                  </TableCell>

                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{order.user?.email}</TableCell>

                  <TableCell
                    onClick={() => toggleRow(order._id)}
                    className="cursor-pointer"
                  >
                    {order.foodItems.length} foods{" "}
                    {expandedRow === order._id ? (
                      <ChevronUp className="inline-block ml-1" size={16} />
                    ) : (
                      <ChevronDown className="inline-block ml-1" size={16} />
                    )}
                  </TableCell>

                  <TableCell>
                    {new Date(order.orderedAt).toISOString().slice(0, 10)}
                  </TableCell>

                  <TableCell>${order.totalPrice}</TableCell>

                  <TableCell>{order.deliveryLocation}</TableCell>

                  <TableCell>
                    <Badge
                      className={`rounded-xl px-3 py-1 ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                </TableRow>

                {/* FOOD DROPDOWN */}
                {expandedRow === order._id && (
                  <TableRow className="bg-gray-50">
                    <TableCell></TableCell>
                    <TableCell colSpan={7}>
                      <div className="p-4 flex flex-col gap-3">
                        {order.foodItems.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-3"
                          >
                            <div className="w-[55px] h-[55px] bg-gray-300 rounded-xl"></div>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                x {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
