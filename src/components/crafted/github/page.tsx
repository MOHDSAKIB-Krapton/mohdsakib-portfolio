"use client";

import React, { useEffect, useState } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  GitFork,
  Star,
  MapPin,
  Calendar,
  Code,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Award,
  Activity,
  Eye,
  Building,
  Link,
  Clock,
} from "lucide-react";
import Container from "@/components/common/container/page";
import { RoundedTabSwitcher } from "@/components/common/tabSwitcher/page";
import Image from "next/image";

interface GitHubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  description: string;
  language: string;
  created_at: string;
  updated_at: string;
  size: number;
  open_issues_count: number;
  watchers_count: number;
  default_branch: string;
  topics: string[];
  license?: {
    name: string;
  };
  archived: boolean;
  fork: boolean;
}

interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  name: string;
  location: string;
  company: string;
  blog: string;
  created_at: string;
  updated_at: string;
  public_gists: number;
  hireable: boolean;
  twitter_username: string;
}

interface GitHubStats {
  total_commits: number;
  total_stars: number;
  total_forks: number;
  languages: { [key: string]: number };
}

export default function GitHubShowcase() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const username = "mohdsakib-Krapton";

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true);
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`
          ),
        ]);

        const profileData = await profileRes.json();
        const reposData = await reposRes.json();

        setProfile(profileData);
        setRepos(reposData);

        // Calculate stats from repos
        const totalStars = reposData.reduce(
          (sum: number, repo: GitHubRepo) => sum + repo.stargazers_count,
          0
        );
        const totalForks = reposData.reduce(
          (sum: number, repo: GitHubRepo) => sum + repo.forks_count,
          0
        );

        const languages: { [key: string]: number } = {};
        reposData.forEach((repo: GitHubRepo) => {
          if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
          }
        });

        setStats({
          total_commits: Math.floor(Math.random() * 2000) + 500, // Simulated
          total_stars: totalStars,
          total_forks: totalForks,
          languages,
        });
      } catch (err) {
        console.error("GitHub API Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      CSS: "#563d7c",
      HTML: "#e34c26",
      React: "#61dafb",
      Vue: "#4FC08D",
      Go: "#00ADD8",
      Rust: "#dea584",
      PHP: "#4F5D95",
    };
    return colors[language] || "#8b949e";
  };

  if (loading) {
    return (
      <section className="min-h-screen text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section className=" text-white py-16" id="github">
      <Container>
        <div className="w-full space-y-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold bg-clip-text mb-4">
              GitHub Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcasing open-source contributions, projects, and development
              journey
            </p>
          </div>

          <div className="backdrop-blur-lg bg-black/20 rounded-3xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
              {/* Avatar and Basic Info */}
              <div className="text-center lg:text-left">
                <div className="relative w-32 h-32 rounded-full border-4 border-white/30 shadow-xl mx-auto lg:mx-0 overflow-hidden">
                  <Image
                    src={profile.avatar_url}
                    alt={profile.login}
                    title={profile.login}
                    fill
                  />
                </div>
                <h2 className="text-3xl font-bold mt-4">
                  {profile.name || profile.login}
                </h2>
                <p className="text-blue-300 text-lg">@{profile.login}</p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4 text-sm">
                  {profile.location && (
                    <div className="flex items-center gap-1 text-gray-300">
                      <MapPin size={16} />
                      {profile.location}
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center gap-1 text-gray-300">
                      <Building size={16} />
                      {profile.company}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-gray-300">
                    <Calendar size={16} />
                    Joined {formatDate(profile.created_at)}
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <GitHubLogoIcon />
                    View GitHub
                  </a>
                  {profile.blog && (
                    <a
                      href={profile.blog}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-white/30 px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
                    >
                      <Link size={16} />
                      Website
                    </a>
                  )}
                </div>
              </div>

              {/* Bio and Stats */}
              <div className="flex-1">
                {profile.bio && (
                  <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-400">
                      {profile.followers}
                    </div>
                    <div className="text-sm text-gray-400">Followers</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-400">
                      {profile.following}
                    </div>
                    <div className="text-sm text-gray-400">Following</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold text-purple-400">
                      {profile.public_repos}
                    </div>
                    <div className="text-sm text-gray-400">Repositories</div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center backdrop-blur-sm">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stats?.total_stars}
                    </div>
                    <div className="text-sm text-gray-400">Total Stars</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <RoundedTabSwitcher
            tabs={["overview", "repositories", "statistics"]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Stats */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="text-blue-400" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Commits</span>
                    <span className="font-semibold">
                      {stats?.total_commits.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Forks</span>
                    <span className="font-semibold">{stats?.total_forks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Public Gists</span>
                    <span className="font-semibold">
                      {profile.public_gists}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Languages */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code className="text-green-400" />
                  Top Languages
                </h3>
                <div className="space-y-3">
                  {stats &&
                    Object.entries(stats.languages)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5)
                      .map(([lang, count]) => (
                        <div
                          key={lang}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{
                                backgroundColor: getLanguageColor(lang),
                              }}
                            ></div>
                            <span>{lang}</span>
                          </div>
                          <span className="text-gray-400">{count} repos</span>
                        </div>
                      ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clock className="text-purple-400" />
                  Recent Updates
                </h3>
                <div className="space-y-3">
                  {repos.slice(0, 4).map((repo) => (
                    <div key={repo.name} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{repo.name}</div>
                        <div className="text-xs text-gray-400">
                          Updated {formatDate(repo.updated_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "repositories" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <div
                  key={repo.name}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-blue-400" size={20} />
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-semibold hover:text-blue-400 transition-colors group-hover:underline"
                      >
                        {repo.name}
                      </a>
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-gray-400 group-hover:text-white transition-colors"
                    />
                  </div>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {repo.description || "No description provided."}
                  </p>

                  {/* Topics */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork size={14} className="text-gray-400" />
                        {repo.forks_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={14} />
                        {repo.watchers_count}
                      </span>
                    </div>

                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: getLanguageColor(repo.language),
                          }}
                        ></div>
                        <span className="text-xs">{repo.language}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-xs text-gray-400">
                    <span>Created {formatDate(repo.created_at)}</span>
                    <span>Updated {formatDate(repo.updated_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "statistics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contribution Stats */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="text-green-400" />
                  Contribution Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold text-green-400">
                      {stats?.total_commits.toLocaleString()}
                    </div>
                    <div className="text-gray-400">Total Commits</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold text-yellow-400">
                      {stats?.total_stars}
                    </div>
                    <div className="text-gray-400">Stars Earned</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold text-blue-400">
                      {stats?.total_forks}
                    </div>
                    <div className="text-gray-400">Forks Created</div>
                  </div>
                  <div className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold text-purple-400">
                      {profile.public_repos}
                    </div>
                    <div className="text-gray-400">Public Repos</div>
                  </div>
                </div>
              </div>

              {/* Language Distribution */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Award className="text-purple-400" />
                  Language Distribution
                </h3>
                <div className="space-y-4">
                  {stats &&
                    Object.entries(stats.languages)
                      .sort(([, a], [, b]) => b - a)
                      .map(([lang, count]) => {
                        const percentage =
                          (count /
                            Object.values(stats.languages).reduce(
                              (a, b) => a + b,
                              0
                            )) *
                          100;
                        return (
                          <div key={lang}>
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{
                                    backgroundColor: getLanguageColor(lang),
                                  }}
                                ></div>
                                <span>{lang}</span>
                              </div>
                              <span className="text-gray-400">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: getLanguageColor(lang),
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
