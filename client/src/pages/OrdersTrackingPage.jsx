import React, { useState, useEffect } from 'react';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  RotateCcw,
  Star,
  Search,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  MapPin,
  Calendar,
  X,
  MessageSquare
} from 'lucide-react';
import { getOrders, getOrderTracking, requestReturn, submitReview } from '../services/api';
import confetti from 'canvas-confetti';

export default function OrdersTrackingPage({ onNavigateToCraft }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  // Return Modal State
  const [returnModalOrder, setReturnModalOrder] = useState(null);
  const [returnReason, setReturnReason] = useState('');
  const [returnSubmitting, setReturnSubmitting] = useState(false);
  const [returnSuccessMsg, setReturnSuccessMsg] = useState('');

  // Review Modal State
  const [reviewModalOrder, setReviewModalOrder] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState('');

  const fetchOrderList = () => {
    setLoading(true);
    getOrders()
      .then(res => {
        if (res.success) {
          setOrders(res.data);
          if (res.data.length > 0 && !selectedOrder) {
            setSelectedOrder(res.data[0]);
          }
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    getOrderTracking(order.orderId)
      .then(res => {
        if (res.success) {
          setSelectedOrder(prev => ({ ...prev, ...res.data }));
        }
      })
      .catch(err => console.error(err));
  };

  // Submit 10-Day Return
  const handleSubmitReturn = async (e) => {
    e.preventDefault();
    if (!returnReason.trim()) return;

    setReturnSubmitting(true);
    try {
      const res = await requestReturn(returnModalOrder.orderId, returnReason);
      if (res.success) {
        setReturnSuccessMsg('Return request submitted successfully. India Post reverse pickup will be scheduled.');
        fetchOrderList();
        if (selectedOrder?.orderId === returnModalOrder.orderId) {
          setSelectedOrder(res.data);
        }
        setTimeout(() => {
          setReturnModalOrder(null);
          setReturnReason('');
          setReturnSuccessMsg('');
        }, 2500);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting return');
    } finally {
      setReturnSubmitting(false);
    }
  };

  // Submit Rating & Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setReviewSubmitting(true);
    try {
      const res = await submitReview({
        craftId: reviewModalOrder.craftId,
        sellerId: reviewModalOrder.artisanId,
        buyerName: reviewModalOrder.buyerName,
        rating: reviewRating,
        comment: reviewText,
        orderId: reviewModalOrder.orderId
      });

      if (res.success) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setReviewSuccessMsg('Review & Rating published! Thank you for supporting Indian master artisans.');
        fetchOrderList();
        setTimeout(() => {
          setReviewModalOrder(null);
          setReviewText('');
          setReviewSuccessMsg('');
        }, 2200);
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Error submitting review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  // Check 10-Day Return Eligibility
  const checkReturnEligibility = (order) => {
    if (order.trackingStatus === 'Return Requested' || order.trackingStatus === 'Returned') {
      return { eligible: false, message: 'Return in progress' };
    }

    if (order.trackingStatus !== 'Delivered') {
      return { eligible: false, message: 'Item not yet delivered' };
    }

    if (!order.deliveryDate) {
      return { eligible: true, daysLeft: 10 };
    }

    const deliveryTime = new Date(order.deliveryDate).getTime();
    const now = Date.now();
    const diffDays = Math.floor((now - deliveryTime) / (1000 * 60 * 60 * 24));

    if (diffDays <= 10) {
      return { eligible: true, daysLeft: 10 - diffDays };
    }

    return { eligible: false, message: '10-Day Return Window Closed' };
  };

  const filteredOrders = orders.filter(o =>
    o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.craftName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-amber-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold">
            <Truck className="w-3.5 h-3.5" />
            <span>India Post Speed Post Direct Integration</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight">
            Order Tracking & Heritage Delivery
          </h1>
          <p className="text-stone-300 text-sm leading-relaxed">
            Follow your handcrafted traditional masterpieces from rural master artisan clusters directly to your doorstep with 10-day guaranteed returns.
          </p>
        </div>

        <div className="absolute right-6 -bottom-6 opacity-10 pointer-events-none hidden md:block">
          <Package className="w-64 h-64 text-amber-500" />
        </div>
      </div>

      {/* Main Grid: Orders List & Tracking Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Order History Search & Cards (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-serif font-bold text-stone-900 flex items-center space-x-2">
              <Package className="w-5 h-5 text-amber-700" />
              <span>Your Orders ({orders.length})</span>
            </h2>
            <span className="text-xs text-stone-500">10-Day Return Guarantee</span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID (ORD-...) or Tracking # (EB...IN)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700 shadow-sm"
            />
          </div>

          {/* Order Cards List */}
          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center text-stone-400 text-xs">
              Loading your authentic orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center text-stone-500 text-xs space-y-2">
              <Package className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="font-semibold">No orders found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => {
                const isSelected = selectedOrder?.orderId === order.orderId;
                const retInfo = checkReturnEligibility(order);

                return (
                  <div
                    key={order.orderId}
                    onClick={() => handleSelectOrder(order)}
                    className={`bg-white rounded-2xl p-4.5 border transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? 'border-amber-700 ring-2 ring-amber-700/20 shadow-md bg-amber-50/20'
                        : 'border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={order.craftImage}
                        alt={order.craftName}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-stone-100"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80';
                        }}
                      />

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-stone-900">{order.orderId}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              order.trackingStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.trackingStatus === 'Return Requested'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {order.trackingStatus}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-stone-800 truncate">{order.craftName}</h4>
                        <p className="text-[11px] text-stone-500 truncate">{order.artisanName}</p>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span className="font-bold text-amber-800">₹{order.amount?.toLocaleString('en-IN')}</span>
                          <span className="text-stone-400 text-[10px] font-mono">{order.trackingId}</span>
                        </div>
                      </div>
                    </div>

                    {/* Return eligibility tag */}
                    {order.trackingStatus === 'Delivered' && (
                      <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
                        {retInfo.eligible ? (
                          <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{retInfo.daysLeft} days left to return</span>
                          </span>
                        ) : (
                          <span className="text-stone-400 font-medium">{retInfo.message}</span>
                        )}

                        <span className="text-amber-700 font-bold flex items-center">
                          Track Status <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Live India Post Tracking Timeline (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl space-y-6">
              {/* Top Order Summary */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-serif font-black text-stone-900">{selectedOrder.craftName}</h3>
                  </div>
                  <p className="text-xs text-stone-500">
                    Artisan Guild: <span className="font-semibold text-stone-800">{selectedOrder.artisanName}</span>
                  </p>
                  <p className="text-xs text-stone-500">
                    Shipped via: <span className="font-bold text-red-700">{selectedOrder.courier || 'India Post Speed Post'}</span>
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <span className="text-xs text-stone-500">Tracking Number:</span>
                  <div className="font-mono font-black text-sm bg-stone-100 px-3 py-1 rounded-xl text-stone-900 border border-stone-200">
                    {selectedOrder.trackingId}
                  </div>
                  <span className="text-[10px] text-stone-400">Official India Post Consignment</span>
                </div>
              </div>

              {/* Status Header Pill */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white ${
                      selectedOrder.trackingStatus === 'Delivered'
                        ? 'bg-emerald-600 shadow-lg shadow-emerald-600/30'
                        : selectedOrder.trackingStatus === 'Return Requested'
                        ? 'bg-orange-600 shadow-lg shadow-orange-600/30'
                        : 'bg-blue-600 shadow-lg shadow-blue-600/30'
                    }`}
                  >
                    {selectedOrder.trackingStatus === 'Delivered' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Truck className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">Current Status</span>
                    <h4 className="text-base font-bold text-stone-900">{selectedOrder.trackingStatus}</h4>
                  </div>
                </div>

                {/* Return / Review Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {selectedOrder.trackingStatus === 'Delivered' && (
                    <>
                      {checkReturnEligibility(selectedOrder).eligible && (
                        <button
                          onClick={() => setReturnModalOrder(selectedOrder)}
                          className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer border border-stone-300"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-stone-700" />
                          <span>Request Return (10-Day Policy)</span>
                        </button>
                      )}

                      <button
                        onClick={() => setReviewModalOrder(selectedOrder)}
                        className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer shadow-md shadow-amber-700/20"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>Rate & Review</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Real-time Tracking Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Tracking History & Transit Milestones</span>
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                  {selectedOrder.trackingTimeline && selectedOrder.trackingTimeline.length > 0 ? (
                    selectedOrder.trackingTimeline.map((step, idx) => {
                      const isLatest = idx === selectedOrder.trackingTimeline.length - 1;
                      return (
                        <div key={idx} className="relative group">
                          {/* Dot */}
                          <div
                            className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                              isLatest
                                ? 'bg-emerald-600 ring-4 ring-emerald-100'
                                : 'bg-stone-400'
                            }`}
                          />

                          <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                              <h5 className={`text-xs font-bold ${isLatest ? 'text-stone-950 text-sm' : 'text-stone-700'}`}>
                                {step.status}
                              </h5>
                              <span className="text-[10px] text-stone-400 font-medium">
                                {new Date(step.timestamp).toLocaleString('en-IN', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>

                            <p className="text-xs text-amber-900 font-semibold flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-amber-700" />
                              <span>{step.location}</span>
                            </p>

                            <p className="text-xs text-stone-500">{step.description}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-xs text-stone-400">No transit history recorded yet.</div>
                  )}
                </div>
              </div>

              {/* Shipping Destination Box */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1">
                <span className="font-bold text-stone-900">Delivery Address:</span>
                <p>{selectedOrder.shippingAddress}</p>
                <p className="text-[11px] text-stone-500">Recipient: {selectedOrder.buyerName} ({selectedOrder.buyerPhone})</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-16 text-center text-stone-400 border border-stone-200 space-y-2">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="font-semibold text-stone-600">Select an order from the list to view its real-time India Post tracking.</p>
            </div>
          )}
        </div>
      </div>

      {/* 10-Day Return Modal */}
      {returnModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-stone-200 shadow-2xl relative">
            <button
              onClick={() => setReturnModalOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-700 text-xs font-bold">
                <RotateCcw className="w-4 h-4" />
                <span>10-Day Hassle-Free Return</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900">Return Request for {returnModalOrder.orderId}</h3>
              <p className="text-xs text-stone-500">
                You are protected under the 10-day artisan return policy. India Post reverse courier will pick up from your address.
              </p>
            </div>

            {returnSuccessMsg ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-semibold">
                {returnSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitReturn} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Reason for Return</label>
                  <select
                    value={returnReason}
                    onChange={(e) => setReturnReason(e.target.value)}
                    required
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                  >
                    <option value="">Select a reason...</option>
                    <option value="Damaged during India Post transit">Damaged during India Post transit</option>
                    <option value="Craft color or dimensions differ from pictures">Craft color or dimensions differ from pictures</option>
                    <option value="Ordered by mistake / change of mind">Ordered by mistake / change of mind</option>
                    <option value="Authenticity concern">Authenticity concern</option>
                    <option value="Other">Other cultural preservation reason</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={returnSubmitting || !returnReason}
                  className="w-full bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  {returnSubmitting ? 'Submitting Return...' : 'Confirm Return Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Ratings & Reviews Modal */}
      {reviewModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-stone-200 shadow-2xl relative">
            <button
              onClick={() => setReviewModalOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-amber-700 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Verified Buyer Review</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900">Rate {reviewModalOrder.craftName}</h3>
              <p className="text-xs text-stone-500">
                Help future art patrons judge authenticity and quality while supporting master artisans.
              </p>
            </div>

            {reviewSuccessMsg ? (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-semibold">
                {reviewSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                {/* Star Picker */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">Rating (1 to 5 Stars)</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 cursor-pointer transform hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= reviewRating
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-800 ml-2">{reviewRating} out of 5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Your Written Review</label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                    placeholder="Describe the craftsmanship, glaze, natural textures, and delivery experience..."
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={reviewSubmitting || !reviewText.trim()}
                  className="w-full bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-700/25"
                >
                  {reviewSubmitting ? 'Publishing Review...' : 'Submit Verified Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
