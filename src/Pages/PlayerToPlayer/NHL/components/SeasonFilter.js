import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function generateArrayOfYears() {
  const max = new Date().getFullYear();
  const min = max - 23;
  const years = [];

  for (var i = max; i >= min; i--) {
    years.push(`${i - 1}-${i}`);
  }
  return years;
}

const years = generateArrayOfYears();

export default function SeasonFilter({ season, setSeason }) {
  const handleChange = (event) => {
    setSeason(event.target.value);
  };

  return (
    <div>
      <FormControl>
        <h2>Regular Season</h2>
        <Select value={season} onChange={handleChange}>
          {years.map((year) => (
            <MenuItem value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
// Season
// Have menu to show all seasons player accrued stats
// Display correct stats when specific seasons are selected
// Should also update teams if player was on a different team in a given season
// If player played a different position in a given season, that should be properly reflected as well
