// Package github contains tools for update checking
package github

// Repo represents GitHub repository
type Repo struct {
	FullName string
}

// FormatTagURL formats release page URL from tag
func (r *Repo) FormatTagURL(tag string) string {
	return "https://github.com/" + r.FullName + "/releases/tag/" + tag
}

// Tags returns all repo tags
func (r *Repo) Tags() ([]string, error) {
	return GetTags(r.FullName)
}

// NewRepo returns new GitHub Repo instance
func NewRepo(fullName string) *Repo {
	return &Repo{
		FullName: fullName,
	}
}
