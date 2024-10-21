import { TestBed } from "@angular/core/testing";
import { ApiService } from "./api.service";
import { movieDto } from "../models/movie.dto";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from "src/environments/environment.prod";

describe('MovieService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get movies', () => {
    const movies: movieDto[] = [
      {
        "backdrop": "https://wookie.codesubmit.io/static/backdrops/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg",
        "cast": [
            "Christian Bale",
            "Heath Ledger",
            "Aaron Eckhart"
        ],
        "classification": "13+",
        "director": "Christopher Nolan",
        "genres": [
            "Action",
            "Crime",
            "Drama"
        ],
        "id": "d6822b7b-48bb-4b78-ad5e-9ba04c517ec8",
        "imdb_rating": 9,
        "length": "2h 32min",
        "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
        "poster": "https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg",
        "released_on": "2008-07-16T00:00:00",
        "slug": "the-dark-knight-2008",
        "title": "The Dark Knight"
    },
    {
      "backdrop": "https://wookie.codesubmit.io/static/backdrops/a9d94d6e-4cab-44a9-8eec-d44ad6332b6d.jpg",
      "cast": [
          "John Travolta",
          "Uma Thurman",
          "Samuel L. Jackson"
      ],
      "classification": "18+",
      "director": "Quentin Tarantino",
      "genres": [
          "Crime",
          "Drama"
      ],
      "id": "a9d94d6e-4cab-44a9-8eec-d44ad6332b6d",
      "imdb_rating": 8.9,
      "length": "2h 34min",
      "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
      "poster": "https://wookie.codesubmit.io/static/posters/a9d94d6e-4cab-44a9-8eec-d44ad6332b6d.jpg",
      "released_on": "1994-09-10T00:00:00",
      "slug": "pulp-fiction-1994",
      "title": "Pulp Fiction"
    },
    {
      "backdrop": "https://wookie.codesubmit.io/static/backdrops/f3d91837-a2ff-4250-99b0-e8c9c036a23a.jpg",
      "cast": [
          "Shameik Moore",
          "Jake Johnson",
          "Hailee Steinfeld"
      ],
      "classification": "7+",
      "director": [
          "Bob Persichetti",
          "Peter Ramsey",
          "Rodney Rothman"
      ],
      "genres": [
          "Animation",
          "Action",
          "Adventure"
      ],
      "id": "f3d91837-a2ff-4250-99b0-e8c9c036a23a",
      "imdb_rating": 8.5,
      "length": "1h 57min",
      "overview": "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson \"Kingpin\" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension.",
      "poster": "https://wookie.codesubmit.io/static/posters/f3d91837-a2ff-4250-99b0-e8c9c036a23a.jpg",
      "released_on": "2018-12-06T00:00:00",
      "slug": "spider-man-into-the-spider-verse-2018",
      "title": "Spider-Man: Into the Spider-Verse"
    }
    ];

    apiService.getMovies().subscribe(response => {
      expect(response.movies.length).toBe(2);
      expect(response.movies).toEqual(response.movies);
    });

    const req = httpMock.expectOne(`${environment.api}/movies`);
    expect(req.request.method).toBe('GET');
    req.flush(movies);
  });
});
