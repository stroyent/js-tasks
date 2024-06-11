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


const vet_visit_table = []

let id,
  name,
  species,
  diagnosis,
  visited_on;

for (visit of vet_check_ins) {
  id = visit.id;
  diagnosis = visit.diagnosis;
  visited_on = visit.datetime;

  for (pet of pets) {
    if (id === pet.id) {
      name = pet.name;
      species_id = pet.species_id;
      break;
    }
  }
  for (species_item of species_specs) {
    if (species_id === species_item.id) {
      common_name = species_item.common_name;
      nomenclature = species_item.nomenclature;
      species = `${common_name} (${nomenclature})`;
      break;
    }
    
  }

  vet_visit_table.push({
    id,
    name,
    species,
    diagnosis,
    visited_on,
  });
};

console.log(vet_visit_table);