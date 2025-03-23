import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X } from "lucide-react";

const FilmFilterPanel = ({ onApplyFilters, onResetFilters, initialFilters = {} }) => {
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || [0, 1000]);
  const [categories, setCategories] = useState(initialFilters.categories || []);
  const [royaltyRange, setRoyaltyRange] = useState(initialFilters.royaltyRange || [0, 30]);
  const [releaseDate, setReleaseDate] = useState(initialFilters.releaseDate || 'all');
  const [filmmakerVerified, setFilmmakerVerified] = useState(initialFilters.filmmakerVerified || false);
  const [exclusiveContent, setExclusiveContent] = useState(initialFilters.exclusiveContent || false);
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || 'recent');

  const categoryOptions = [
    { id: 'documentary', label: 'Documentary' },
    { id: 'short-film', label: 'Short Film' },
    { id: 'feature', label: 'Feature Film' },
    { id: 'animation', label: 'Animation' },
    { id: 'experimental', label: 'Experimental' },
    { id: 'music-video', label: 'Music Video' },
  ];

  const handleCategoryChange = (id) => {
    setCategories(prev => {
      if (prev.includes(id)) {
        return prev.filter(c => c !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleApply = () => {
    onApplyFilters({
      priceRange,
      categories,
      royaltyRange,
      releaseDate,
      filmmakerVerified,
      exclusiveContent,
      sortOrder
    });
  };

  const handleReset = () => {
    setPriceRange([0, 1000]);
    setCategories([]);
    setRoyaltyRange([0, 30]);
    setReleaseDate('all');
    setFilmmakerVerified(false);
    setExclusiveContent(false);
    setSortOrder('recent');
    onResetFilters();
  };

  return (
    <div className="p-4 bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-purple-100 flex items-center">
          <Filter className="mr-2 h-5 w-5" />
          Advanced Filters
        </h3>
        <Button variant="ghost" size="sm" onClick={handleReset} className="text-purple-300 hover:text-purple-100">
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      {/* Price Range */}
      <div>
        <Label className="text-purple-200 mb-2 block">Price Range (FILM)</Label>
        <div className="mb-2">
          <Slider
            defaultValue={priceRange}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-4"
          />
        </div>
        <div className="flex justify-between text-sm text-purple-300">
          <span>{priceRange[0]} FILM</span>
          <span>{priceRange[1]} FILM</span>
        </div>
      </div>

      {/* Categories */}
      <div>
        <Label className="text-purple-200 mb-2 block">Categories</Label>
        <div className="grid grid-cols-2 gap-2">
          {categoryOptions.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={categories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-purple-200"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Royalty Percentage */}
      <div>
        <Label className="text-purple-200 mb-2 block">Royalty Percentage</Label>
        <div className="mb-2">
          <Slider
            defaultValue={royaltyRange}
            max={30}
            step={1}
            value={royaltyRange}
            onValueChange={setRoyaltyRange}
            className="my-4"
          />
        </div>
        <div className="flex justify-between text-sm text-purple-300">
          <span>{royaltyRange[0]}%</span>
          <span>{royaltyRange[1]}%</span>
        </div>
      </div>

      {/* Release Date */}
      <div>
        <Label className="text-purple-200 mb-2 block">Release Date</Label>
        <RadioGroup value={releaseDate} onValueChange={setReleaseDate} className="space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="r1" />
            <Label htmlFor="r1" className="text-purple-200">All Time</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="week" id="r2" />
            <Label htmlFor="r2" className="text-purple-200">This Week</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="month" id="r3" />
            <Label htmlFor="r3" className="text-purple-200">This Month</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="year" id="r4" />
            <Label htmlFor="r4" className="text-purple-200">This Year</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Additional Filters */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={filmmakerVerified}
            onCheckedChange={setFilmmakerVerified}
          />
          <Label htmlFor="verified" className="text-purple-200">Verified Filmmakers Only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="exclusive"
            checked={exclusiveContent}
            onCheckedChange={setExclusiveContent}
          />
          <Label htmlFor="exclusive" className="text-purple-200">Exclusive Content Only</Label>
        </div>
      </div>

      {/* Sort Order */}
      <div>
        <Label className="text-purple-200 mb-2 block">Sort By</Label>
        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-full bg-white/10 backdrop-blur-lg border-purple-500/20 text-purple-100">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white/10 backdrop-blur-lg border-purple-500/20">
            <SelectItem value="recent" className="text-purple-200">Most Recent</SelectItem>
            <SelectItem value="price-asc" className="text-purple-200">Price: Low to High</SelectItem>
            <SelectItem value="price-desc" className="text-purple-200">Price: High to Low</SelectItem>
            <SelectItem value="title" className="text-purple-200">Title</SelectItem>
            <SelectItem value="royalty" className="text-purple-200">Highest Royalty</SelectItem>
            <SelectItem value="popularity" className="text-purple-200">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleApply} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        Apply Filters
      </Button>
    </div>
  );
};

export default FilmFilterPanel;