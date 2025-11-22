'use client'
import { useState, useEffect } from "react";
import { Search, Menu } from "lucide-react";
import SideBar from "./SideBar";
import { useRouter, usePathname } from "next/navigation";


interface Category {
  label: string;
  value: string;
}

const categories: Category[] = [
  { label: "Technology", value: "technology" },
  { label: "General", value: "general" },
  { label: "Gaming", value: "gaming" },
  { label: "Health", value: "health" },
  { label: "Business", value: "business" },
  { label: "Sports", value: "sports" },
  { label: "Entertainment", value: "entertainment" },
];

const Header = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const urlCategory = pathname.startsWith("/category/")
  ? pathname.split("/")[2]
  : null;

  const goHomeSmooth = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 250); 
    }
  };

  const goHome = () => {  
    setSelectedCategory(null);   
    router.push("/");
    setOpen(false);        
    setTimeout(() => {             
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
  }

  const search = () => {
     setShowSearch(prev => !prev);
  }

  const categorySelect = (value: string) => {
    setSelectedCategory(value);
    router.push(`/category/${value}`);
    setOpen(false);
  }

  const reorderedCategories = selectedCategory ? [
    categories.find((c) => c.value === selectedCategory)!,
    { label: 'Home', value:"__home"},
    ...categories.filter((c) => c.value !== selectedCategory),
  ]
  : categories;

  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [urlCategory]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-4">
          
            <h1 
              onClick={goHomeSmooth}
              className="cursor-pointer text-gray-700 hover:text-black text-lg sm:text-xl md:text-xl"
            >
              NextNews
            </h1>


          <div className="flex items-center gap-6 relative">

            {showSearch && (
              <input 
                type="text"
                placeholder="Search..."
                className={`absolute right-12 px-2 py-1 border rounded-lg outline-none bg-gray-200/30 focus:bg-gray-200/70 hover:bg-gray-200/70 placeholder:text-gray-400/70 transition-all duration-300 ease-in-out
                  ${showSearch 
                      ? "opacity-100 scale-100 w-40 sm:w-52 md:w-60 lg:w-72" 
                      : "opacity-0 scale-90 w-0 pointer-events-none"
                    }
                `}
              />
            )}

            <Search 
              onClick={search}
              className="text-gray-700 hover:text-black cursor-pointer" size={18} />

            <button
              onClick={() => setOpen(true)}
              aria-label="Open Menu"
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              <Menu size={20} className="text-gray-700 hover:text-black" />
            </button>
          </div>
        </div>
      </header>

      <SideBar 
        open={open} 
        onClose={() => setOpen(false)} 
        categories={reorderedCategories} 
        selectedCategory={selectedCategory}
        onSelectCategory={categorySelect}
        goHome={goHome}  
      />
    </>
  );
};


export default Header
