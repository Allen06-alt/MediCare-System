// pages/public/Doctors.jsx

import {
  useState,
  useEffect,
} from "react";

import SkeletonCard
from "../../components/common/SkeletonCard";

import DoctorCard
from "../../components/doctors/DoctorCard";

import SearchBar
from "../../components/doctors/SearchBar";

import FilterButtons
from "../../components/doctors/FilterButtons";

import Stats
from "../../components/doctors/Stats";

import FeaturedDoctor
from "../../components/doctors/FeaturedDoctor";

import Footer
from "../../components/layout/Footer";

import API
from "../../api/api";

export default function Doctors() {

  const [search,
    setSearch] =
      useState("");

  const [filter,
    setFilter] =
      useState("All");

  const [loading,
    setLoading] =
      useState(true);

  const [doctors,
    setDoctors] =
      useState([]);

  // 🔥 FETCH DOCTORS
  useEffect(() => {

    const fetchDoctors =
      async () => {

        try {

          const res =
            await API.get(
              "/doctors"
            );

          // 🔥 REMOVE DUPLICATES
          const uniqueDoctors =
            Array.from(

              new Map(
                res.data.map(
                  (d) => [
                    d._id,
                    d,
                  ]
                )
              ).values()
            );

          setDoctors(
            uniqueDoctors
          );

          setLoading(false);

        } catch (err) {

          console.log(err);

          setLoading(false);
        }
      };

    fetchDoctors();

  }, []);

  // 🔥 FILTER
  const filtered =
    doctors.filter((d) => {

      const name =
        d.name
          ?.toLowerCase() || "";

      const spec =
        d.specialization
          ?.toLowerCase() || "";

      return (

        (
          filter === "All" ||

          d.specialization ===
            filter
        ) &&

        (
          name.includes(
            search.toLowerCase()
          ) ||

          spec.includes(
            search.toLowerCase()
          )
        )
      );
    });

  return (

    <>

      <div className="px-4 md:px-10 py-10 bg-gray-50 pb-24">

        {/* 🔥 TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6">

          Find Your Specialist

        </h1>

        {/* 🔥 SEARCH */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* 🔥 FILTER */}
        <FilterButtons
          filter={filter}
          setFilter={setFilter}
        />

        {/* 🔥 STATS */}
        <Stats />

        {/* 🔥 FEATURED */}
        <FeaturedDoctor />

        {/* 🔥 GRID */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {loading ? (

            Array(6)
              .fill()
              .map((_, i) => (

                <SkeletonCard
                  key={i}
                />
              ))

          ) : filtered.length > 0 ? (

            filtered.map((doc) => (

              <DoctorCard
                key={doc._id}
                doc={doc}
              />
            ))

          ) : (

            <p className="text-center col-span-3 text-gray-500">

              No doctors found

            </p>
          )}

        </div>

        {/* 🔥 EXTRA SPACE */}
        <div className="h-10"></div>

      </div>

      {/* 🔥 FOOTER */}
      <Footer />

    </>
  );
}