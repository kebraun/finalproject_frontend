import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { CatCardComponent } from './cat-card/cat-card.component';
import { SearchComponent } from './search/search.component';
import { CatBioComponent } from './cat-bio/cat-bio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { BreedResultComponent } from './breed-result/breed-result.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CatCardComponent,
    SearchComponent,
    CatBioComponent,
    NotFoundComponent,
    QuizComponent,
    AboutComponent,
    BreedResultComponent,
    FavoritesComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
