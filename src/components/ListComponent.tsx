import { getCountries, getPeople } from 'DataApi';
import { GetCounriesResponse } from 'DataApi/country.interface';
import { GetPeopleResponse } from 'DataApi/people.interface';
import React, {useMemo, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from 'store/searchReducer';

const combineInfo = (
  countries,
  people
): { fullName: string, age: number, countryFullName:string }[] => {
  return people.map((person) => {
    const matchingCountry = countries.find(
      (country) => country.alpha2Code === person.country || country.alpha3Code === person.country
    );

    const fullName = `${person.first_name} ${person.last_name}`;

    // Calculate age based on date_of_birth (replace with your actual age calculation logic)
    const age = calculateAge(new Date(person.date_of_birth));

    const countryFullName = matchingCountry ? matchingCountry.name : 'Unknown';

    return { fullName, age, countryFullName };
  });
};

// Function to calculate age based on date_of_birth
const calculateAge = (dob: Date): number => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

const ListComponent = () => {
	const searchTerm = useSelector((state: any) => state.search.searchTerm);
	const [currentResults, setResults] = useState<[GetPeopleResponse, GetCounriesResponse]>(null);

	useEffect(() => {
		Promise.all([getPeople({ search: searchTerm }),getCountries({ search: searchTerm })]).then((results) => {
			setResults(results);
		});
	}, [searchTerm])
	

	const resultsToShow = useMemo(() => {
		const [peopleResults, countriesResults] = currentResults;
		const combinedInfo = combineInfo(countriesResults.searchResults,peopleResults.searchResults );
		return combinedInfo;
	}, [currentResults])

	return (
					<div className="listWrapper">
						<div>
							{resultsToShow.map((r) => {
							return <div>
								<p>{r.fullName}</p>
								<p>{r.age}</p>
								<p>{r.countryFullName}</p>
								</div>
							})}
						</div>
					</div>
	);
}

export default ListComponent;