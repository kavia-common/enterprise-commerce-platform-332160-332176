import React from "react";
import { Package, ShoppingBag, TrendingUp, User } from "lucide-react";

/**
 * Dashboard overview page — the main landing page for the dashboard section.
 * Displays summary cards with key metrics and a responsive grid layout.
 *
 * This page renders within the DashboardLayout which provides the
 * Navbar + DashboardSidebar shell, so it has its own sidebar navigation
 * separate from the main shopping sidebar.
 */
// PUBLIC_INTERFACE
export default function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A2E] tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-[#737373] mt-1">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      {/* Summary cards grid — responsive from 1 to 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {/* Total Orders card */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#737373]">
              Total Orders
            </span>
            <div className="p-2 rounded-lg bg-[#3b82f6]/10">
              <Package size={18} className="text-[#3b82f6]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A2E]">1,284</p>
          <p className="text-xs text-[#10B981] mt-1 font-medium">
            +12.5% from last month
          </p>
        </div>

        {/* Total Products card */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#737373]">
              Products
            </span>
            <div className="p-2 rounded-lg bg-[#06b6d4]/10">
              <ShoppingBag size={18} className="text-[#06b6d4]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A2E]">356</p>
          <p className="text-xs text-[#10B981] mt-1 font-medium">
            +8 new this week
          </p>
        </div>

        {/* Revenue card */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#737373]">Revenue</span>
            <div className="p-2 rounded-lg bg-[#10B981]/10">
              <TrendingUp size={18} className="text-[#10B981]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A2E]">$48,290</p>
          <p className="text-xs text-[#10B981] mt-1 font-medium">
            +18.2% from last month
          </p>
        </div>

        {/* Customers card */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] p-5 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#737373]">
              Customers
            </span>
            <div className="p-2 rounded-lg bg-[#F59E0B]/10">
              <User size={18} className="text-[#F59E0B]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-[#1A1A2E]">2,847</p>
          <p className="text-xs text-[#10B981] mt-1 font-medium">
            +5.3% from last month
          </p>
        </div>
      </div>

      {/* Recent activity section */}
      <div className="bg-white rounded-xl border border-[#E5E5E5] shadow-[var(--shadow-sm)]">
        <div className="p-5 border-b border-[#E5E5E5]">
          <h2 className="text-lg font-semibold text-[#1A1A2E]">
            Recent Activity
          </h2>
          <p className="text-sm text-[#737373] mt-0.5">
            Your latest orders and updates
          </p>
        </div>
        <div className="divide-y divide-[#E5E5E5]">
          {[
            {
              id: "ORD-1284",
              customer: "Sarah Johnson",
              amount: "$129.00",
              status: "Delivered",
              statusColor: "text-[#10B981] bg-[#10B981]/10",
            },
            {
              id: "ORD-1283",
              customer: "Michael Chen",
              amount: "$89.00",
              status: "Shipped",
              statusColor: "text-[#3b82f6] bg-[#3b82f6]/10",
            },
            {
              id: "ORD-1282",
              customer: "Emily Rodriguez",
              amount: "$199.00",
              status: "Processing",
              statusColor: "text-[#F59E0B] bg-[#F59E0B]/10",
            },
            {
              id: "ORD-1281",
              customer: "James Wilson",
              amount: "$59.00",
              status: "Pending",
              statusColor: "text-[#737373] bg-[#F5F5F5]",
            },
          ].map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-5 hover:bg-[#FAFAFA] transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#3b82f6]/10 flex items-center justify-center flex-shrink-0">
                  <Package size={16} className="text-[#3b82f6]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1A1A2E] truncate">
                    {order.id}
                  </p>
                  <p className="text-xs text-[#737373] truncate">
                    {order.customer}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="text-sm font-medium text-[#1A1A2E] hidden sm:block">
                  {order.amount}
                </span>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${order.statusColor}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
