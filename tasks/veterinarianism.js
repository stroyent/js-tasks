const pets = [
  { id: 1,
    name: "some name, you name it",
    age: "32",
    species_id: 1,
  },
  { id: 2,
    name: "Дымка",
    age: "10",
    species_id: 2,
  },
];

const species_specs = [
  { id: 1,
    nomenclature: "Canis lupus familiaris",
    common_name: "dog",
    comment: "huh yeh, as if there is no other meta-info that I could've put in here",
  },
  { id: 2,
  nomenclature: "Felis catus",
  common_name: "cat",
  comment: "kitty!!",
  },
];

const vet_check_ins = [
  { id: 1,
    pet_id: 1,
    diagnosis: "he ok",
    datetime: 1717342320000,
  },
  { id: 2,
    pet_id: 2,
    diagnosis: "she ok",
    datetime: 1717663495201,
  }
];

function combineVisitInfo(pets, species_specs, vet_check_ins) {
  const vet_visit_table = []


  for (visit of vet_check_ins) {	
	let {id, diagnosis, datetime: visited_on} = visit;

	let {name, species_id} = pets.find(item => item.id === id);
	
	let {common_name, nomenclature} = species_specs.find(item => item.id === species_id);
	species = `${common_name} (${nomenclature})`;

    vet_visit_table.push({
      id,
      name,
      species,
      diagnosis,
      visited_on,
    });
  };

  return vet_visit_table;
}