import React from 'react';
import { Play, Heart } from 'lucide-react';
import { useTactics } from '../context/TacticsContext';
import { TacticDetail } from '../components/TacticDetail';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Home = () => {
  const { 
    selectedCategory, 
    selectedDecade, 
    selectedTactic, 
    setSelectedTactic, 
    tacticDetails,
    loading,
    error 
  } = useTactics();
  
  if (selectedTactic) {
    return <TacticDetail />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading tactics: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-black overflow-auto pt-16 md:pt-0">
      <header className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          {selectedDecade ? `Tactics from the ${selectedDecade}` : selectedCategory || 'All Tactics'}
        </h1>
      </header>

      {tacticDetails.length === 0 ? (
        <div className="px-8 py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No tactics found for this {selectedDecade ? 'decade' : 'category'}.
          </p>
        </div>
      ) : (
        <div className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-8">
          {tacticDetails.map((tactic) => (
            <div
              key={tactic.id}
              className="bg-white dark:bg-gray-800/40 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer shadow-sm"
              onClick={() => setSelectedTactic(tactic)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-500/20 rounded-md flex items-center justify-center">
                  <Play className="text-primary-500" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{tactic.tactic_name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tactic.formation_id}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{tactic.club}</span>
                <button 
                  className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};