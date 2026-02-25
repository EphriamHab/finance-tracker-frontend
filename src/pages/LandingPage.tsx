/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, PieChart, LayoutDashboard, ListChecks } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FE]">
      <nav className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">$</div>
          <span className="text-xl font-bold text-slate-800">FinanceTrack</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 text-slate-600 font-semibold hover:text-indigo-600 transition-colors">Login</Link>
          <Link to="/register" className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">Join Now</Link>
        </div>
      </nav>
      <header className="container mx-auto px-6 pt-16 pb-24 text-center">
        {/* <span className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-6 inline-block">
          Take-Home Project 1: Personal Finance Tracker
        </span> */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1]">
          Visualize your <br />
          <span className="text-indigo-600">financial summary.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          A full-stack solution to track income and expenses effortlessly. 
          Manage your transactions and view real-time balance data in one professional dashboard.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group">
            Start Tracking Transactions <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
            Explore Dashboard
          </button>
        </div>
      </header>
      <section className="bg-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                icon: <LayoutDashboard className="text-indigo-600" size={32}/>, 
                title: 'Financial Summary', 
                desc: 'Get a clear view of total income, total expenses, and your current balance at a glance.' 
              },
              { 
                icon: <ListChecks className="text-indigo-600" size={32}/>, 
                title: 'Transaction Management', 
                desc: 'Easily create, update, and delete transactions with detailed category and description fields.' 
              },
              { 
                icon: <PieChart className="text-indigo-600" size={32}/>, 
                title: 'Categorized Spending', 
                desc: 'See exactly where your money goes with automatic totals grouped by category.' 
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-[#F8F9FE] border border-transparent hover:border-indigo-100 transition-all">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;