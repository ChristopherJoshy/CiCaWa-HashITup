'use client';'use client';'use client';'use client';'use client';'use client';'use client';'use client';'use client';



import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import AppLayout from '@/components/AppLayout';import { useEffect, useState } from 'react';

import { Plus, Trash2, ShoppingCart, TrendingUp } from 'lucide-react';

import { api } from '@/lib/api';import { useRouter } from 'next/navigation';



interface User {import AppLayout from '@/components/AppLayout';import { useEffect, useState } from 'react';

  id: number;

  email: string;import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

  name: string;

  role: string;import { api } from '@/lib/api';import { useRouter } from 'next/navigation';

}



export default function DashboardPage() {

  const [user, setUser] = useState<User | null>(null);interface User {import AppLayout from '@/components/AppLayout';import { useEffect, useState } from 'react';

  const [loading, setLoading] = useState(true);

  const router = useRouter();  id: number;



  useEffect(() => {  email: string;import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

    const userData = localStorage.getItem('user');

    if (!userData) {  name: string;

      router.push('/auth/login');

      return;  role: string;import { api } from '@/lib/api';import { useRouter } from 'next/navigation';

    }

    }

    const parsedUser = JSON.parse(userData);

    setUser(parsedUser);

    setLoading(false);

  }, [router]);interface WasteRequest {



  if (loading) {  id: number;interface User {import AppLayout from '@/components/AppLayout';import { useEffect, useState } from 'react';

    return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">  waste_type: string;

        <div className="text-center">

          <div className="spinner spinner-lg mx-auto mb-4"></div>  quantity: number;  id: number;

          <p className="text-caption">Loading dashboard...</p>

        </div>  status: string;

      </div>

    );  pickup_address: string;  email: string;import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

  }

  created_at: string;

  if (!user) {

    return <div>Loading...</div>;}  name: string;

  }



  return (

    <AppLayout title="Dashboard" user={user}>export default function DashboardPage() {  role: string;import { api } from '@/lib/api';import { useRouter } from 'next/navigation';

      <div className="container py-6">

        <div   const [user, setUser] = useState<User | null>(null);

          className="card mb-6 text-white" 

          style={{  const [prices, setPrices] = useState<Record<string, number>>({});}

            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'

          }}  const [requests, setRequests] = useState<WasteRequest[]>([]);

        >

          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>  const [loading, setLoading] = useState(true);

          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>

          <div   const router = useRouter();

            className="badge" 

            style={{interface WasteRequest {

              background: 'rgba(255,255,255,0.2)', 

              color: 'white'  useEffect(() => {

            }}

          >    const userData = localStorage.getItem('user');  id: number;interface User {import AppLayout from '@/components/AppLayout';import { useEffect, useState } from 'react';

            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

          </div>    if (!userData) {

        </div>

      router.push('/auth/login');  waste_type: string;

        <div className="mb-6">

          <h2 className="text-heading mb-4">Quick Actions</h2>      return;

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <button     }  quantity: number;  id: number;

              onClick={() => router.push('/waste')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"    

            >

              <div className="flex items-center space-x-3">    const parsedUser = JSON.parse(userData);  status: string;

                <div className="bg-emerald-100 p-3 rounded-lg">

                  <Plus className="h-6 w-6 text-emerald-600" />    setUser(parsedUser);

                </div>

                <div>      pickup_address: string;  email: string;import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

                  <h3 className="text-subheading">Request Pickup</h3>

                  <p className="text-caption">Schedule waste collection</p>    const loadData = async () => {

                </div>

              </div>      try {  created_at: string;

            </button>

                    const userProfile = await api.getCurrentUser();

            <button 

              onClick={() => router.push('/marketplace')}        console.log('✅ Authentication working:', userProfile);}  name: string;

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

            >        

              <div className="flex items-center space-x-3">

                <div className="bg-blue-100 p-3 rounded-lg">        const wastePrices = await api.getWastePrices();

                  <ShoppingCart className="h-6 w-6 text-blue-600" />

                </div>        setPrices(wastePrices);

                <div>

                  <h3 className="text-subheading">Browse Market</h3>export default function DashboardPage() {  role: string;import { api, WasteRequest } from '@/lib/api';import { useRouter } from 'next/navigation';

                  <p className="text-caption">Buy & sell items</p>

                </div>        const wasteRequests = await api.getWasteRequests();

              </div>

            </button>        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);  const [user, setUser] = useState<User | null>(null);

          </div>

        </div>      } catch (error) {



        <div className="card">        console.error('❌ API Error:', error);  const [prices, setPrices] = useState<Record<string, number>>({});}

          <h2 className="text-heading mb-4">Recent Activity</h2>

          <div className="text-center py-8">        if (error instanceof Error && error.message.includes('401')) {

            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">

              <TrendingUp className="h-8 w-8 text-gray-400" />          localStorage.removeItem('user');  const [requests, setRequests] = useState<WasteRequest[]>([]);

            </div>

            <p className="text-body mb-2">No recent activity</p>          localStorage.removeItem('access_token');

            <p className="text-caption">Start by creating your first waste pickup request!</p>

          </div>          router.push('/auth/login');  const [loading, setLoading] = useState(true);

        </div>

      </div>        }

    </AppLayout>

  );      } finally {  const router = useRouter();

}
        setLoading(false);

      }interface WasteRequest {

    };

  useEffect(() => {

    loadData();

  }, [router]);    const userData = localStorage.getItem('user');  id: number;interface User {import AppLayout from '@/components/AppLayout';import { useEffect, useState } from 'react';



  if (loading) {    if (!userData) {

    return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center">      router.push('/auth/login');  waste_type: string;

        <div className="text-center">

          <div className="spinner spinner-lg mx-auto mb-4"></div>      return;

          <p className="text-caption">Loading dashboard...</p>

        </div>    }  quantity: number;  id: number;

      </div>

    );    

  }

    const parsedUser = JSON.parse(userData);  status: string;

  if (!user) {

    return <div>Loading...</div>;    setUser(parsedUser);

  }

      pickup_address: string;  email: string;import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

  return (

    <AppLayout title="Dashboard" user={user}>    const loadData = async () => {

      <div className="container py-6">

        <div       try {  created_at: string;

          className="card mb-6 text-white" 

          style={{        const userProfile = await api.getCurrentUser();

            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'

          }}        console.log('✅ Authentication working:', userProfile);}  name: string;

        >

          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>        

          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>

          <div         const wastePrices = await api.getWastePrices();

            className="badge" 

            style={{        setPrices(wastePrices);

              background: 'rgba(255,255,255,0.2)', 

              color: 'white'export default function DashboardPage() {  role: string;import { api, WasteRequest } from '@/lib/api';import { useRouter } from 'next/navigation';

            }}

          >        const wasteRequests = await api.getWasteRequests();

            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

          </div>        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);  const [user, setUser] = useState<User | null>(null);

        </div>

      } catch (error) {

        {Object.keys(prices).length > 0 && (

          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">        console.error('❌ API Error:', error);  const [prices, setPrices] = useState<Record<string, number>>({});}

            <div className="flex items-center gap-2">

              <div className="status-dot status-active"></div>        if (error instanceof Error && error.message.includes('401')) {

              <p className="text-body text-emerald-800">Connected to API successfully!</p>

            </div>          localStorage.removeItem('user');  const [requests, setRequests] = useState<WasteRequest[]>([]);

            <p className="text-caption text-emerald-600 mt-1">

              Loaded {Object.keys(prices).length} waste price categories          localStorage.removeItem('access_token');

            </p>

          </div>          router.push('/auth/login');  const [loading, setLoading] = useState(true);

        )}

        }

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="card card-compact">      } finally {  const router = useRouter();

            <div className="flex items-center justify-between">

              <div>        setLoading(false);

                <p className="text-caption">Active Requests</p>

                <p className="text-title">      }export default function DashboardPage() {

                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}

                </p>    };

              </div>

              <div className="bg-emerald-100 p-3 rounded-lg">  useEffect(() => {

                <Trash2 className="h-6 w-6 text-emerald-600" />

              </div>    loadData();

            </div>

          </div>  }, [router]);    const userData = localStorage.getItem('user');  const [user, setUser] = useState<User | null>(null);interface User {import AppLayout from '@/components/AppLayout';import { useEffect, useState } from 'react';import { useEffect, useState } from 'react';

          

          <div className="card card-compact">

            <div className="flex items-center justify-between">

              <div>  if (loading) {    if (!userData) {

                <p className="text-caption">Waste Types</p>

                <p className="text-title">{Object.keys(prices).length}</p>    return (

              </div>

              <div className="bg-emerald-100 p-3 rounded-lg">      <div className="min-h-screen bg-gray-50 flex items-center justify-center">      router.push('/auth/login');  const [prices, setPrices] = useState<Record<string, number>>({});

                <DollarSign className="h-6 w-6 text-emerald-600" />

              </div>        <div className="text-center">

            </div>

          </div>          <div className="spinner spinner-lg mx-auto mb-4"></div>      return;

        </div>

          <p className="text-caption">Loading dashboard...</p>

        <div className="mb-6">

          <h2 className="text-heading mb-4">Quick Actions</h2>        </div>    }  const [requests, setRequests] = useState<WasteRequest[]>([]);  id: number;

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <button       </div>

              onClick={() => router.push('/waste')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"    );    

            >

              <div className="flex items-center space-x-3">  }

                <div className="bg-emerald-100 p-3 rounded-lg">

                  <Plus className="h-6 w-6 text-emerald-600" />    const parsedUser = JSON.parse(userData);  const [loading, setLoading] = useState(true);

                </div>

                <div>  if (!user) {

                  <h3 className="text-subheading">Request Pickup</h3>

                  <p className="text-caption">Schedule waste collection</p>    return <div>Loading...</div>;    setUser(parsedUser);

                </div>

              </div>  }

            </button>

                  const router = useRouter();  email: string;import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

            <button 

              onClick={() => router.push('/marketplace')}  return (

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

            >    <AppLayout title="Dashboard" user={user}>    const loadData = async () => {

              <div className="flex items-center space-x-3">

                <div className="bg-blue-100 p-3 rounded-lg">      <div className="container py-6">

                  <ShoppingCart className="h-6 w-6 text-blue-600" />

                </div>        {/* Welcome Section */}      try {

                <div>

                  <h3 className="text-subheading">Browse Market</h3>        <div 

                  <p className="text-caption">Buy & sell items</p>

                </div>          className="card mb-6 text-white"         const userProfile = await api.getCurrentUser();

              </div>

            </button>          style={{

          </div>

        </div>            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'        console.log('✅ Authentication working:', userProfile);  useEffect(() => {  name: string;



        {Object.keys(prices).length > 0 && (          }}

          <div className="card mb-6">

            <h2 className="text-heading mb-4">Current Waste Prices</h2>        >        

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

              {Object.entries(prices).map(([type, price]) => (          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>

                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">

                  <p className="text-body font-medium capitalize">{type}</p>          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>        const wastePrices = await api.getWastePrices();    const userData = localStorage.getItem('user');

                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>

                </div>          <div 

              ))}

            </div>            className="badge"         setPrices(wastePrices);

          </div>

        )}            style={{



        <div className="card">              background: 'rgba(255,255,255,0.2)',     if (!userData) {  role: string;import Link from 'next/link';import { useRouter } from 'next/navigation';import { useRouter }        {/* Welcome 'use client';

          <h2 className="text-heading mb-4">Recent Activity</h2>

          {requests.length === 0 ? (              color: 'white'

            <div className="text-center py-8">

              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">            }}        const wasteRequests = await api.getWasteRequests();

                <TrendingUp className="h-8 w-8 text-gray-400" />

              </div>          >

              <p className="text-body mb-2">No recent activity</p>

              <p className="text-caption">Start by creating your first waste pickup request!</p>            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);      router.push('/auth/login');

            </div>

          ) : (          </div>

            <div className="space-y-3">

              {requests        </div>      } catch (error) {

                .slice()

                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

                .slice(0, 5)

                .map((request) => (        {/* API Status */}        console.error('❌ API Error:', error);      return;}

                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">

                    <div>        {Object.keys(prices).length > 0 && (

                      <p className="text-body font-medium capitalize">{request.waste_type}</p>

                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">        if (error instanceof Error && error.message.includes('401')) {

                    </div>

                    <span className={`badge ${            <div className="flex items-center gap-2">

                      request.status === 'completed' ? 'badge-success' :

                      request.status === 'cancelled' ? 'badge-error' :              <div className="status-dot status-active"></div>          localStorage.removeItem('user');    }

                      request.status === 'pending' ? 'badge-warning' :

                      'badge-info'              <p className="text-body text-emerald-800">Connected to API successfully!</p>

                    }`}>

                      {request.status.replace('_', ' ')}            </div>          localStorage.removeItem('access_token');

                    </span>

                  </div>            <p className="text-caption text-emerald-600 mt-1">

                ))}

            </div>              Loaded {Object.keys(prices).length} waste price categories          router.push('/auth/login');    import { api, WasteRequest } from '@/lib/api';

          )}

        </div>            </p>

      </div>

    </AppLayout>          </div>        }

  );

}        )}

      } finally {    const parsedUser = JSON.parse(userData);

        {/* Quick Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">        setLoading(false);

          <div className="card card-compact">

            <div className="flex items-center justify-between">      }    setUser(parsedUser);export default function DashboardPage() {

              <div>

                <p className="text-caption">Active Requests</p>    };

                <p className="text-title">

                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}    

                </p>

              </div>    loadData();

              <div className="bg-emerald-100 p-3 rounded-lg">

                <Trash2 className="h-6 w-6 text-emerald-600" />  }, [router]);    const loadData = async () => {  const [user, setUser] = useState<User | null>(null);import AppLayout from '@/components/AppLayout';

              </div>

            </div>

          </div>

            if (loading) {      try {

          <div className="card card-compact">

            <div className="flex items-center justify-between">    return (

              <div>

                <p className="text-caption">Waste Types</p>      <div className="min-h-screen bg-gray-50 flex items-center justify-center">        const userProfile = await api.getCurrentUser();  const [prices, setPrices] = useState<Record<string, number>>({});

                <p className="text-title">{Object.keys(prices).length}</p>

              </div>        <div className="text-center">

              <div className="bg-emerald-100 p-3 rounded-lg">

                <DollarSign className="h-6 w-6 text-emerald-600" />          <div className="spinner spinner-lg mx-auto mb-4"></div>        console.log('✅ Authentication working:', userProfile);

              </div>

            </div>          <p className="text-caption">Loading dashboard...</p>

          </div>

        </div>        </div>          const [requests, setRequests] = useState<WasteRequest[]>([]);interface User {



        {/* Quick Actions */}      </div>

        <div className="mb-6">

          <h2 className="text-heading mb-4">Quick Actions</h2>    );        const wastePrices = await api.getWastePrices();

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <button   }

              onClick={() => router.push('/waste')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"        setPrices(wastePrices);  const [loading, setLoading] = useState(true);

            >

              <div className="flex items-center space-x-3">  if (!user) {

                <div className="bg-emerald-100 p-3 rounded-lg">

                  <Plus className="h-6 w-6 text-emerald-600" />    return <div>Loading...</div>;

                </div>

                <div>  }

                  <h3 className="text-subheading">Request Pickup</h3>

                  <p className="text-caption">Schedule waste collection</p>        const wasteRequests = await api.getWasteRequests();  const router = useRouter();  id: number;import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';import { useEffect, useState } from 'react';

                </div>

              </div>  return (

            </button>

                <AppLayout title="Dashboard" user={user}>        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);

            <button 

              onClick={() => router.push('/marketplace')}      <div className="container py-6">

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

            >        {/* Welcome Section */}      } catch (error) {

              <div className="flex items-center space-x-3">

                <div className="bg-blue-100 p-3 rounded-lg">        <div 

                  <ShoppingCart className="h-6 w-6 text-blue-600" />

                </div>          className="card mb-6 text-white"         console.error('❌ API Error:', error);

                <div>

                  <h3 className="text-subheading">Browse Market</h3>          style={{

                  <p className="text-caption">Buy & sell items</p>

                </div>            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'        if (error instanceof Error && error.message.includes('401')) {  useEffect(() => {  email: string;

              </div>

            </button>          }}

          </div>

        </div>        >          localStorage.removeItem('user');



        {/* Waste Prices */}          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>

        {Object.keys(prices).length > 0 && (

          <div className="card mb-6">          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>          localStorage.removeItem('access_token');    const userData = localStorage.getItem('user');

            <h2 className="text-heading mb-4">Current Waste Prices</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">          <div 

              {Object.entries(prices).map(([type, price]) => (

                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">            className="badge"           router.push('/auth/login');

                  <p className="text-body font-medium capitalize">{type}</p>

                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>            style={{

                </div>

              ))}              background: 'rgba(255,255,255,0.2)',         }    if (!userData) {  name: string;import Link from 'next/link';import { useRouter } from 'next/navigation';

            </div>

          </div>              color: 'white'

        )}

            }}      } finally {

        {/* Recent Activity */}

        <div className="card">          >

          <h2 className="text-heading mb-4">Recent Activity</h2>

          {requests.length === 0 ? (            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}        setLoading(false);      router.push('/auth/login');

            <div className="text-center py-8">

              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">          </div>

                <TrendingUp className="h-8 w-8 text-gray-400" />

              </div>        </div>      }

              <p className="text-body mb-2">No recent activity</p>

              <p className="text-caption">Start by creating your first waste pickup request!</p>

            </div>

          ) : (        {/* API Status */}    };      return;  role: string;

            <div className="space-y-3">

              {requests        {Object.keys(prices).length > 0 && (

                .slice()

                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">

                .slice(0, 5)

                .map((request) => (            <div className="flex items-center gap-2">

                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">

                    <div>              <div className="status-dot status-active"></div>    loadData();    }

                      <p className="text-body font-medium capitalize">{request.waste_type}</p>

                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>              <p className="text-body text-emerald-800">Connected to API successfully!</p>

                    </div>

                    <span className={`badge ${            </div>  }, [router]);

                      request.status === 'completed' ? 'badge-success' :

                      request.status === 'cancelled' ? 'badge-error' :            <p className="text-caption text-emerald-600 mt-1">

                      request.status === 'pending' ? 'badge-warning' :

                      'badge-info'              Loaded {Object.keys(prices).length} waste price categories    }import { api, WasteRequest } from '@/lib/api';import AppLayout from '@/components/AppLayout';

                    }`}>

                      {request.status.replace('_', ' ')}            </p>

                    </span>

                  </div>          </div>  if (loading) {

                ))}

            </div>        )}

          )}

        </div>    return (    const parsedUser = JSON.parse(userData);

      </div>

    </AppLayout>        {/* Quick Stats */}

  );

}        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

          <div className="card card-compact">

            <div className="flex items-center justify-between">        <div className="text-center">    setUser(parsedUser);

              <div>

                <p className="text-caption">Active Requests</p>          <div className="spinner spinner-lg mx-auto mb-4"></div>

                <p className="text-title">

                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}          <p className="text-caption">Loading dashboard...</p>    

                </p>

              </div>        </div>

              <div className="bg-emerald-100 p-3 rounded-lg">

                <Trash2 className="h-6 w-6 text-emerald-600" />      </div>    const loadData = async () => {export default function DashboardPage() {import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

              </div>

            </div>    );

          </div>

            }      try {

          <div className="card card-compact">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-caption">Waste Types</p>  if (!user) {        const userProfile = await api.getCurrentUser();  const [user, setUser] = useState<User | null>(null);

                <p className="text-title">{Object.keys(prices).length}</p>

              </div>    return <div>Loading...</div>;

              <div className="bg-emerald-100 p-3 rounded-lg">

                <DollarSign className="h-6 w-6 text-emerald-600" />  }        console.log('✅ Authentication working:', userProfile);

              </div>

            </div>

          </div>

        </div>  return (          const [prices, setPrices] = useState<Record<string, number>>({});interface User {import Link from 'next/link';



        {/* Quick Actions */}    <AppLayout title="Dashboard" user={user}>

        <div className="mb-6">

          <h2 className="text-heading mb-4">Quick Actions</h2>      <div className="container py-6">        const wastePrices = await api.getWastePrices();

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <button         {/* Welcome Section */}

              onClick={() => router.push('/waste')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"        <div         setPrices(wastePrices);  const [requests, setRequests] = useState<WasteRequest[]>([]);

            >

              <div className="flex items-center space-x-3">          className="card mb-6 text-white" 

                <div className="bg-emerald-100 p-3 rounded-lg">

                  <Plus className="h-6 w-6 text-emerald-600" />          style={{

                </div>

                <div>            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'

                  <h3 className="text-subheading">Request Pickup</h3>

                  <p className="text-caption">Schedule waste collection</p>          }}        const wasteRequests = await api.getWasteRequests();  const [loading, setLoading] = useState(true);  id: number;import { api, WasteRequest } from '@/lib/api';

                </div>

              </div>        >

            </button>

                      <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);

            <button 

              onClick={() => router.push('/marketplace')}          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

            >          <div       } catch (error) {  const router = useRouter();

              <div className="flex items-center space-x-3">

                <div className="bg-blue-100 p-3 rounded-lg">            className="badge" 

                  <ShoppingCart className="h-6 w-6 text-blue-600" />

                </div>            style={{        console.error('❌ API Error:', error);

                <div>

                  <h3 className="text-subheading">Browse Market</h3>              background: 'rgba(255,255,255,0.2)', 

                  <p className="text-caption">Buy & sell items</p>

                </div>              color: 'white'        if (error instanceof Error && error.message.includes('401')) {  email: string;

              </div>

            </button>            }}

          </div>

        </div>          >          localStorage.removeItem('user');



        {/* Waste Prices */}            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

        {Object.keys(prices).length > 0 && (

          <div className="card mb-6">          </div>          localStorage.removeItem('access_token');  useEffect(() => {

            <h2 className="text-heading mb-4">Current Waste Prices</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">        </div>

              {Object.entries(prices).map(([type, price]) => (

                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">          router.push('/auth/login');

                  <p className="text-body font-medium capitalize">{type}</p>

                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>        {/* API Status */}

                </div>

              ))}        {Object.keys(prices).length > 0 && (        }    const userData = localStorage.getItem('user');  name: string;interface User {

            </div>

          </div>          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">

        )}

            <div className="flex items-center gap-2">      } finally {

        {/* Recent Activity */}

        <div className="card">              <div className="status-dot status-active"></div>

          <h2 className="text-heading mb-4">Recent Activity</h2>

          {requests.length === 0 ? (              <p className="text-body text-emerald-800">Connected to API successfully!</p>        setLoading(false);    if (!userData) {

            <div className="text-center py-8">

              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">            </div>

                <TrendingUp className="h-8 w-8 text-gray-400" />

              </div>            <p className="text-caption text-emerald-600 mt-1">      }

              <p className="text-body mb-2">No recent activity</p>

              <p className="text-caption">Start by creating your first waste pickup request!</p>              Loaded {Object.keys(prices).length} waste price categories

            </div>

          ) : (            </p>    };      router.push('/auth/login');  role: string;  id: number;

            <div className="space-y-3">

              {requests          </div>

                .slice()

                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())        )}

                .slice(0, 5)

                .map((request) => (

                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">

                    <div>        {/* Quick Stats */}    loadData();      return;

                      <p className="text-body font-medium capitalize">{request.waste_type}</p>

                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    </div>

                    <span className={`badge ${          <div className="card card-compact">  }, [router]);

                      request.status === 'completed' ? 'badge-success' :

                      request.status === 'cancelled' ? 'badge-error' :            <div className="flex items-center justify-between">

                      request.status === 'pending' ? 'badge-warning' :

                      'badge-info'              <div>    }}  email: string;

                    }`}>

                      {request.status.replace('_', ' ')}                <p className="text-caption">Active Requests</p>

                    </span>

                  </div>                <p className="text-title">  if (loading) {

                ))}

            </div>                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}

          )}

        </div>                </p>    return (    

      </div>

    </AppLayout>              </div>

  );

}              <div className="bg-emerald-100 p-3 rounded-lg">      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

                <Trash2 className="h-6 w-6 text-emerald-600" />

              </div>        <div className="text-center">    const parsedUser = JSON.parse(userData);  name: string;

            </div>

          </div>          <div className="spinner spinner-lg mx-auto mb-4"></div>

          

          <div className="card card-compact">          <p className="text-caption">Loading dashboard...</p>    setUser(parsedUser);

            <div className="flex items-center justify-between">

              <div>        </div>

                <p className="text-caption">Waste Types</p>

                <p className="text-title">{Object.keys(prices).length}</p>      </div>    export default function DashboardPage() {  role: string;

              </div>

              <div className="bg-emerald-100 p-3 rounded-lg">    );

                <DollarSign className="h-6 w-6 text-emerald-600" />

              </div>  }    // Test the API call to verify token is working

            </div>

          </div>

        </div>

  if (!user) {    const loadData = async () => {  const [user, setUser] = useState<User | null>(null);}

        {/* Quick Actions */}

        <div className="mb-6">    return <div>Loading...</div>;

          <h2 className="text-heading mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">  }      try {

            <button 

              onClick={() => router.push('/waste')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

            >  return (        // Test authenticated endpoint  const [prices, setPrices] = useState<Record<string, number>>({});

              <div className="flex items-center space-x-3">

                <div className="bg-emerald-100 p-3 rounded-lg">    <AppLayout title="Dashboard" user={user}>

                  <Plus className="h-6 w-6 text-emerald-600" />

                </div>      <div className="container py-6">        const userProfile = await api.getCurrentUser();

                <div>

                  <h3 className="text-subheading">Request Pickup</h3>        {/* Welcome Section */}

                  <p className="text-caption">Schedule waste collection</p>

                </div>        <div         console.log('✅ Authentication working:', userProfile);  const [requests, setRequests] = useState<WasteRequest[]>([]);export default function DashboardPage() {

              </div>

            </button>          className="card mb-6 text-white" 

            

            <button           style={{        

              onClick={() => router.push('/marketplace')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'

            >

              <div className="flex items-center space-x-3">          }}        // Load waste prices and requests  const [loading, setLoading] = useState(true);  const [user, setUser] = useState<User | null>(null);

                <div className="bg-blue-100 p-3 rounded-lg">

                  <ShoppingCart className="h-6 w-6 text-blue-600" />        >

                </div>

                <div>          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>        const wastePrices = await api.getWastePrices();

                  <h3 className="text-subheading">Browse Market</h3>

                  <p className="text-caption">Buy & sell items</p>          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>

                </div>

              </div>          <div         setPrices(wastePrices);  const router = useRouter();  const [prices, setPrices] = useState<Record<string, number>>({});

            </button>

          </div>            className="badge" 

        </div>

            style={{

        {/* Waste Prices */}

        {Object.keys(prices).length > 0 && (              background: 'rgba(255,255,255,0.2)', 

          <div className="card mb-6">

            <h2 className="text-heading mb-4">Current Waste Prices</h2>              color: 'white'        const wasteRequests = await api.getWasteRequests();  const [requests, setRequests] = useState<WasteRequest[]>([]);

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

              {Object.entries(prices).map(([type, price]) => (            }}

                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">

                  <p className="text-body font-medium capitalize">{type}</p>          >        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);

                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>

                </div>            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

              ))}

            </div>          </div>      } catch (error) {  useEffect(() => {  const [loading, setLoading] = useState(true);

          </div>

        )}        </div>



        {/* Recent Activity */}        console.error('❌ API Error:', error);

        <div className="card">

          <h2 className="text-heading mb-4">Recent Activity</h2>        {/* API Status */}

          {requests.length === 0 ? (

            <div className="text-center py-8">        {Object.keys(prices).length > 0 && (        // If auth fails, redirect to login    const userData = localStorage.getItem('user');  const router = useRouter();

              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">

                <TrendingUp className="h-8 w-8 text-gray-400" />          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">

              </div>

              <p className="text-body mb-2">No recent activity</p>            <div className="flex items-center gap-2">        if (error instanceof Error && error.message.includes('401')) {

              <p className="text-caption">Start by creating your first waste pickup request!</p>

            </div>              <div className="status-dot status-active"></div>

          ) : (

            <div className="space-y-3">              <p className="text-body text-emerald-800">Connected to API successfully!</p>          localStorage.removeItem('user');    if (!userData) {

              {requests

                .slice()            </div>

                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

                .slice(0, 5)            <p className="text-caption text-emerald-600 mt-1">          localStorage.removeItem('access_token');

                .map((request) => (

                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">              Loaded {Object.keys(prices).length} waste price categories

                    <div>

                      <p className="text-body font-medium capitalize">{request.waste_type}</p>            </p>          router.push('/auth/login');      router.push('/auth/login');  useEffect(() => {

                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>

                    </div>          </div>

                    <span className={`badge ${

                      request.status === 'completed' ? 'badge-success' :        )}        }

                      request.status === 'cancelled' ? 'badge-error' :

                      request.status === 'pending' ? 'badge-warning' :

                      'badge-info'

                    }`}>        {/* Quick Stats */}      } finally {      return;    const userData = localStorage.getItem('user');

                      {request.status.replace('_', ' ')}

                    </span>        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                  </div>

                ))}          <div className="card card-compact">        setLoading(false);

            </div>

          )}            <div className="flex items-center justify-between">

        </div>

      </div>              <div>      }    }    if (!userData) {

    </AppLayout>

  );                <p className="text-caption">Active Requests</p>

}
                <p className="text-title">    };

                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}

                </p>          router.push('/auth/login');

              </div>

              <div className="bg-emerald-100 p-3 rounded-lg">    loadData();

                <Trash2 className="h-6 w-6 text-emerald-600" />

              </div>  }, [router]);    const parsedUser = JSON.parse(userData);      return;

            </div>

          </div>

          

          <div className="card card-compact">  if (loading) {    setUser(parsedUser);    }

            <div className="flex items-center justify-between">

              <div>    return (

                <p className="text-caption">Waste Types</p>

                <p className="text-title">{Object.keys(prices).length}</p>      <div className="min-h-screen bg-gray-50 flex items-center justify-center">        

              </div>

              <div className="bg-emerald-100 p-3 rounded-lg">        <div className="text-center">

                <DollarSign className="h-6 w-6 text-emerald-600" />

              </div>          <div className="spinner spinner-lg mx-auto mb-4"></div>    // Test the API call to verify token is working    const parsedUser = JSON.parse(userData);

            </div>

          </div>          <p className="text-caption">Loading dashboard...</p>

        </div>

        </div>    const loadData = async () => {    setUser(parsedUser);

        {/* Quick Actions */}

        <div className="mb-6">      </div>

          <h2 className="text-heading mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">    );      try {    

            <button 

              onClick={() => router.push('/waste')}  }

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

            >        // Test authenticated endpoint    // Test the API call to verify token is working

              <div className="flex items-center space-x-3">

                <div className="bg-emerald-100 p-3 rounded-lg">  if (!user) {

                  <Plus className="h-6 w-6 text-emerald-600" />

                </div>    return <div>Loading...</div>;        const userProfile = await api.getCurrentUser();    const loadData = async () => {

                <div>

                  <h3 className="text-subheading">Request Pickup</h3>  }

                  <p className="text-caption">Schedule waste collection</p>

                </div>        console.log('✅ Authentication working:', userProfile);      try {

              </div>

            </button>  return (

            

            <button     <AppLayout title="Dashboard" user={user}>                // Test authenticated endpoint

              onClick={() => router.push('/marketplace')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"      <div className="container py-6">

            >

              <div className="flex items-center space-x-3">        {/* Welcome Section */}        // Load waste prices and requests        const userProfile = await api.getCurrentUser();

                <div className="bg-blue-100 p-3 rounded-lg">

                  <ShoppingCart className="h-6 w-6 text-blue-600" />        <div 

                </div>

                <div>          className="card mb-6 text-white"         const wastePrices = await api.getWastePrices();        console.log('✅ Authentication working:', userProfile);

                  <h3 className="text-subheading">Browse Market</h3>

                  <p className="text-caption">Buy & sell items</p>          style={{

                </div>

              </div>            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'        setPrices(wastePrices);        

            </button>

          </div>          }}

        </div>

        >        // Load waste prices and requests

        {/* Waste Prices */}

        {Object.keys(prices).length > 0 && (          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>

          <div className="card mb-6">

            <h2 className="text-heading mb-4">Current Waste Prices</h2>          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>        const wasteRequests = await api.getWasteRequests();        const wastePrices = await api.getWastePrices();

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

              {Object.entries(prices).map(([type, price]) => (          <div 

                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">

                  <p className="text-body font-medium capitalize">{type}</p>            className="badge"         setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);        setPrices(wastePrices);

                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>

                </div>            style={{

              ))}

            </div>              background: 'rgba(255,255,255,0.2)',       } catch (error) {

          </div>

        )}              color: 'white'



        {/* Recent Activity */}            }}        console.error('❌ API Error:', error);        const wasteRequests = await api.getWasteRequests();

        <div className="card">

          <h2 className="text-heading mb-4">Recent Activity</h2>          >

          {requests.length === 0 ? (

            <div className="text-center py-8">            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}        // If auth fails, redirect to login        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);

              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">

                <TrendingUp className="h-8 w-8 text-gray-400" />          </div>

              </div>

              <p className="text-body mb-2">No recent activity</p>        </div>        if (error instanceof Error && error.message.includes('401')) {      } catch (error) {

              <p className="text-caption">Start by creating your first waste pickup request!</p>

            </div>

          ) : (

            <div className="space-y-3">        {/* API Status */}          localStorage.removeItem('user');        console.error('❌ API Error:', error);

              {requests

                .slice()        {Object.keys(prices).length > 0 && (

                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

                .slice(0, 5)          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">          localStorage.removeItem('access_token');        // If auth fails, redirect to login

                .map((request) => (

                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">            <div className="flex items-center gap-2">

                    <div>

                      <p className="text-body font-medium capitalize">{request.waste_type}</p>              <div className="status-dot status-active"></div>          router.push('/auth/login');        if (error instanceof Error && error.message.includes('401')) {

                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>

                    </div>              <p className="text-body text-emerald-800">Connected to API successfully!</p>

                    <span className={`badge ${

                      request.status === 'completed' ? 'badge-success' :            </div>        }          localStorage.removeItem('user');

                      request.status === 'cancelled' ? 'badge-error' :

                      request.status === 'pending' ? 'badge-warning' :            <p className="text-caption text-emerald-600 mt-1">

                      'badge-info'

                    }`}>              Loaded {Object.keys(prices).length} waste price categories      } finally {          localStorage.removeItem('access_token');

                      {request.status.replace('_', ' ')}

                    </span>            </p>

                  </div>

                ))}          </div>        setLoading(false);          router.push('/auth/login');

            </div>

          )}        )}

        </div>

      </div>      }        }

    </AppLayout>

  );        {/* Quick Stats */}

}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">    };      } finally {

          <div className="card card-compact">

            <div className="flex items-center justify-between">        setLoading(false);

              <div>

                <p className="text-caption">Active Requests</p>    loadData();      }

                <p className="text-title">

                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}  }, [router]);    };

                </p>

              </div>

              <div className="bg-emerald-100 p-3 rounded-lg">

                <Trash2 className="h-6 w-6 text-emerald-600" />  if (loading) {    loadData();

              </div>

            </div>    return (  }, [router]);

          </div>

                <div className="min-h-screen bg-gray-50 flex items-center justify-center">

          <div className="card card-compact">

            <div className="flex items-center justify-between">        <div className="text-center">  if (loading) {

              <div>

                <p className="text-caption">Waste Types</p>          <div className="spinner spinner-lg mx-auto mb-4"></div>    return (

                <p className="text-title">{Object.keys(prices).length}</p>

              </div>          <p className="text-caption">Loading dashboard...</p>      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

              <div className="bg-emerald-100 p-3 rounded-lg">

                <DollarSign className="h-6 w-6 text-emerald-600" />        </div>        <div className="text-center">

              </div>

            </div>      </div>          <div className="spinner spinner-lg mx-auto mb-4"></div>

          </div>

        </div>    );          <p className="text-caption">Loading dashboard...</p>



        {/* Quick Actions */}  }        </div>

        <div className="mb-6">

          <h2 className="text-heading mb-4">Quick Actions</h2>      </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <button   if (!user) {    );

              onClick={() => router.push('/waste')}

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"    return <div>Loading...</div>;  }

            >

              <div className="flex items-center space-x-3">  }

                <div className="bg-emerald-100 p-3 rounded-lg">

                  <Plus className="h-6 w-6 text-emerald-600" />  if (!user) {

                </div>

                <div>  return (    return <div>Loading...</div>;

                  <h3 className="text-subheading">Request Pickup</h3>

                  <p className="text-caption">Schedule waste collection</p>    <AppLayout title="Dashboard" user={user}>  }

                </div>

              </div>      <div className="container py-6">

            </button>

                    {/* Welcome Section */}  return (

            <button 

              onClick={() => router.push('/marketplace')}        <div     <AppLayout title="Dashboard" user={user}>

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

            >          className="card mb-6 text-white"       <div className="container py-6">

              <div className="flex items-center space-x-3">

                <div className="bg-blue-100 p-3 rounded-lg">          style={{        {/* Welcome Section */}

                  <ShoppingCart className="h-6 w-6 text-blue-600" />

                </div>            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'        <div 

                <div>

                  <h3 className="text-subheading">Browse Market</h3>          }}          className="card mb-6 text-white" 

                  <p className="text-caption">Buy & sell items</p>

                </div>        >          style={{

              </div>

            </button>          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'

          </div>

        </div>          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>          }}



        {/* Waste Prices */}          <div         >

        {Object.keys(prices).length > 0 && (

          <div className="card mb-6">            className="badge"           <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>

            <h2 className="text-heading mb-4">Current Waste Prices</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">            style={{          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>

              {Object.entries(prices).map(([type, price]) => (

                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">              background: 'rgba(255,255,255,0.2)',           <div 

                  <p className="text-body font-medium capitalize">{type}</p>

                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>              color: 'white'            className="badge" 

                </div>

              ))}            }}            style={{

            </div>

          </div>          >              background: 'rgba(255,255,255,0.2)', 

        )}

            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}              color: 'white'

        {/* Recent Activity */}

        <div className="card">          </div>            }}

          <h2 className="text-heading mb-4">Recent Activity</h2>

          {requests.length === 0 ? (        </div>          >

            <div className="text-center py-8">

              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}

                <TrendingUp className="h-8 w-8 text-gray-400" />

              </div>        {/* API Status */}          </div>

              <p className="text-body mb-2">No recent activity</p>

              <p className="text-caption">Start by creating your first waste pickup request!</p>        {Object.keys(prices).length > 0 && (        </div>

            </div>

          ) : (          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">

            <div className="space-y-3">

              {requests            <div className="flex items-center gap-2">        {/* API Status */}

                .slice()

                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())              <div className="status-dot status-active"></div>        {Object.keys(prices).length > 0 && (

                .slice(0, 5)

                .map((request) => (              <p className="text-body text-emerald-800">Connected to API successfully!</p>          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">

                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">

                    <div>            </div>            <div className="flex items-center gap-2">

                      <p className="text-body font-medium capitalize">{request.waste_type}</p>

                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>            <p className="text-caption text-emerald-600 mt-1">              <div className="status-dot status-active"></div>

                    </div>

                    <span className={`badge ${              Loaded {Object.keys(prices).length} waste price categories              <p className="text-body text-emerald-800">Connected to API successfully!</p>

                      request.status === 'completed' ? 'badge-success' :

                      request.status === 'cancelled' ? 'badge-error' :            </p>            </div>

                      request.status === 'pending' ? 'badge-warning' :

                      'badge-info'          </div>            <p className="text-caption text-emerald-600 mt-1">

                    }`}>

                      {request.status.replace('_', ' ')}        )}              Loaded {Object.keys(prices).length} waste price categories

                    </span>

                  </div>            </p>

                ))}

            </div>        {/* Quick Stats */}          </div>

          )}

        </div>        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">        )}

      </div>

    </AppLayout>          <div className="card card-compact">

  );

}            <div className="flex items-center justify-between">        {/* Quick Stats */}

              <div>        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                <p className="text-caption">Active Requests</p>          <div className="card card-compact">

                <p className="text-title">            <div className="flex items-center justify-between">

                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}              <div>

                </p>                <p className="text-caption">Active Requests</p>

              </div>                <p className="text-title">

              <div className="bg-emerald-100 p-3 rounded-lg">                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}

                <Trash2 className="h-6 w-6 text-emerald-600" />                </p>

              </div>              </div>

            </div>              <div className="bg-emerald-100 p-3 rounded-lg">

          </div>                <Trash2 className="h-6 w-6 text-emerald-600" />

                        </div>

          <div className="card card-compact">            </div>

            <div className="flex items-center justify-between">          </div>

              <div>          

                <p className="text-caption">Waste Types</p>          <div className="card card-compact">

                <p className="text-title">{Object.keys(prices).length}</p>            <div className="flex items-center justify-between">

              </div>              <div>

              <div className="bg-emerald-100 p-3 rounded-lg">                <p className="text-caption">Waste Types</p>

                <DollarSign className="h-6 w-6 text-emerald-600" />                <p className="text-title">{Object.keys(prices).length}</p>

              </div>              </div>

            </div>              <div className="bg-emerald-100 p-3 rounded-lg">

          </div>                <DollarSign className="h-6 w-6 text-emerald-600" />

        </div>              </div>

            </div>

        {/* Quick Actions */}          </div>

        <div className="mb-6">        </div>

          <h2 className="text-heading mb-4">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">        {/* Quick Actions */}

            <button         <div className="mb-6">

              onClick={() => router.push('/waste')}          <h2 className="text-heading mb-4">Quick Actions</h2>

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            >            <button 

              <div className="flex items-center space-x-3">              onClick={() => router.push('/waste')}

                <div className="bg-emerald-100 p-3 rounded-lg">              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

                  <Plus className="h-6 w-6 text-emerald-600" />            >

                </div>              <div className="flex items-center space-x-3">

                <div>                <div className="bg-emerald-100 p-3 rounded-lg">

                  <h3 className="text-subheading">Request Pickup</h3>                  <Plus className="h-6 w-6 text-emerald-600" />

                  <p className="text-caption">Schedule waste collection</p>                </div>

                </div>                <div>

              </div>                  <h3 className="text-subheading">Request Pickup</h3>

            </button>                  <p className="text-caption">Schedule waste collection</p>

                            </div>

            <button               </div>

              onClick={() => router.push('/marketplace')}            </button>

              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"            

            >            <button 

              <div className="flex items-center space-x-3">              onClick={() => router.push('/marketplace')}

                <div className="bg-blue-100 p-3 rounded-lg">              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"

                  <ShoppingCart className="h-6 w-6 text-blue-600" />            >

                </div>              <div className="flex items-center space-x-3">

                <div>                <div className="bg-blue-100 p-3 rounded-lg">

                  <h3 className="text-subheading">Browse Market</h3>                  <ShoppingCart className="h-6 w-6 text-blue-600" />

                  <p className="text-caption">Buy & sell items</p>                </div>

                </div>                <div>

              </div>                  <h3 className="text-subheading">Browse Market</h3>

            </button>                  <p className="text-caption">Buy & sell items</p>

          </div>                </div>

        </div>              </div>

            </button>

        {/* Waste Prices */}          </div>

        {Object.keys(prices).length > 0 && (        </div>

          <div className="card mb-6">

            <h2 className="text-heading mb-4">Current Waste Prices</h2>        {/* Waste Prices */}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">        {Object.keys(prices).length > 0 && (

              {Object.entries(prices).map(([type, price]) => (          <div className="card mb-6">

                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">            <h2 className="text-heading mb-4">Current Waste Prices</h2>

                  <p className="text-body font-medium capitalize">{type}</p>            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">

                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>              {Object.entries(prices).map(([type, price]) => (

                </div>                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">

              ))}                  <p className="text-body font-medium capitalize">{type}</p>

            </div>                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>

          </div>                </div>

        )}              ))}

            </div>

        {/* Recent Activity */}          </div>

        <div className="card">        )}

          <h2 className="text-heading mb-4">Recent Activity</h2>

          {requests.length === 0 ? (        {/* Recent Activity */}

            <div className="text-center py-8">        <div className="card">

              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">          <h2 className="text-heading mb-4">Recent Activity</h2>

                <TrendingUp className="h-8 w-8 text-gray-400" />          {requests.length === 0 ? (

              </div>            <div className="text-center py-8">

              <p className="text-body mb-2">No recent activity</p>              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">

              <p className="text-caption">Start by creating your first waste pickup request!</p>                <TrendingUp className="h-8 w-8 text-gray-400" />

            </div>              </div>

          ) : (              <p className="text-body mb-2">No recent activity</p>

            <div className="space-y-3">              <p className="text-caption">Start by creating your first waste pickup request!</p>

              {requests            </div>

                .slice()          ) : (

                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())            <div className="space-y-3">

                .slice(0, 5)              {requests

                .map((request) => (                .slice()

                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

                    <div>                .slice(0, 5)

                      <p className="text-body font-medium capitalize">{request.waste_type}</p>                .map((request) => (

                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">

                    </div>                    <div>

                    <span className={`badge ${                      <p className="text-body font-medium capitalize">{request.waste_type}</p>

                      request.status === 'completed' ? 'badge-success' :                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>

                      request.status === 'cancelled' ? 'badge-error' :                    </div>

                      request.status === 'pending' ? 'badge-warning' :                    <span className={`badge ${

                      'badge-info'                      request.status === 'completed' ? 'badge-success' :

                    }`}>                      request.status === 'cancelled' ? 'badge-error' :

                      {request.status.replace('_', ' ')}                      request.status === 'pending' ? 'badge-warning' :

                    </span>                      'badge-info'

                  </div>                    }`}>

                ))}                      {request.status.replace('_', ' ')}

            </div>                    </span>

          )}                  </div>

        </div>                ))}

      </div>            </div>

    </AppLayout>          )}

  );        </div>

}      </div>
    </AppLayout>
  );
} */}
        <div 
          className="card mb-6" 
          style={{
            background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))',
            color: 'white'
          }}
        >
          <h1 className="text-title mb-2">Welcome back, {user.name}!</h1>
          <p className="text-body opacity-90 mb-3">Ready to make a positive environmental impact?</p>
          <div 
            className="badge" 
            style={{
              background: 'rgba(255,255,255,0.2)', 
              color: 'white'
            }}
          >
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
        </div>ext/navigation';
import AppLayout from '@/components/AppLayout';
import { Plus, Trash2, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { api, WasteRequest } from '@/lib/api';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [requests, setRequests] = useState<WasteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Test the API call to verify token is working
    const loadData = async () => {
      try {
        // Test authenticated endpoint
        const userProfile = await api.getCurrentUser();
        console.log('✅ Authentication working:', userProfile);
        
        // Load waste prices and requests
        const wastePrices = await api.getWastePrices();
        setPrices(wastePrices);

        const wasteRequests = await api.getWasteRequests();
        setRequests(Array.isArray(wasteRequests) ? wasteRequests : []);
      } catch (error) {
        console.error('❌ API Error:', error);
        // If auth fails, redirect to login
        if (error instanceof Error && error.message.includes('401')) {
          localStorage.removeItem('user');
          localStorage.removeItem('access_token');
          router.push('/auth/login');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner spinner-lg mx-auto mb-4"></div>
          <p className="text-caption">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <AppLayout title="Dashboard" user={user}>
      <div className="p-4">
        {/* Welcome Section */}
        <div className="card" style={{background: 'linear-gradient(135deg, var(--emerald-500), var(--emerald-600))'}>
          <h1 className="text-title text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-body text-white opacity-90 mb-3">Ready to make a positive environmental impact?</p>
          <div className="badge badge-success" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </div>
        </div>

        {/* API Status */}
        {Object.keys(prices).length > 0 && (
          <div className="card card-compact mb-6 border-emerald-200 bg-emerald-50">
            <div className="flex items-center gap-2">
              <div className="status-dot status-active"></div>
              <p className="text-body text-emerald-800">Connected to API successfully!</p>
            </div>
            <p className="text-caption text-emerald-600 mt-1">
              Loaded {Object.keys(prices).length} waste price categories
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="card card-compact">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption">Active Requests</p>
                <p className="text-title">
                  {requests.filter((r) => r.status !== 'completed' && r.status !== 'cancelled').length}
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Trash2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="card card-compact">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption">Waste Types</p>
                <p className="text-title">{Object.keys(prices).length}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-heading mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => router.push('/waste')}
              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <Plus className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-subheading">Request Pickup</h3>
                  <p className="text-caption">Schedule waste collection</p>
                </div>
              </div>
            </button>
            
            <button 
              onClick={() => router.push('/marketplace')}
              className="card card-compact text-left transition-smooth hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-subheading">Browse Market</h3>
                  <p className="text-caption">Buy & sell items</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Waste Prices */}
        {Object.keys(prices).length > 0 && (
          <div className="card mb-6">
            <h2 className="text-heading mb-4">Current Waste Prices</h2>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(prices).map(([type, price]) => (
                <div key={type} className="bg-gray-50 rounded-lg p-3 transition-smooth hover:bg-gray-100">
                  <p className="text-body font-medium capitalize">{type}</p>
                  <p className="text-caption text-emerald-600 font-semibold">${price}/kg</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-heading mb-4">Recent Activity</h2>
          {requests.length === 0 ? (
            <div className="text-center py-8">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-body mb-2">No recent activity</p>
              <p className="text-caption">Start by creating your first waste pickup request!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {requests
                .slice()
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, 5)
                .map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-smooth hover:bg-gray-100">
                    <div>
                      <p className="text-body font-medium capitalize">{request.waste_type}</p>
                      <p className="text-caption">{request.quantity} kg • {request.pickup_address}</p>
                    </div>
                    <span className={`badge ${
                      request.status === 'completed' ? 'badge-success' :
                      request.status === 'cancelled' ? 'badge-error' :
                      request.status === 'pending' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {request.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}