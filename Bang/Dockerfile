FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# copy csproj files first (layer caching)
COPY ["Api/Api.csproj", "Api/"]
COPY ["Core/Core.csproj", "Core/"]

RUN dotnet restore "Api/Api.csproj"

# now copy everything else
COPY . .

# build from inside the Api folder
WORKDIR /src/Api
RUN dotnet publish "Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Bang.Api.dll"]
