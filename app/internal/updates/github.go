// Package updates contains tools for update checking
package updates

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
)

type gitHubTag struct {
	Name string `json:"name"`
}

// GitHubUpdater represents GitHub update checker
type GitHubUpdater struct {
	FullName string
}

// ReleaseURL formats release page URL from tag
func (u *GitHubUpdater) ReleaseURL(tag string) string {
	return "https://github.com/" + u.FullName + "/releases/tag/" + tag
}

// Latest returns latest tag
func (u *GitHubUpdater) Latest() (string, error) {
	response, err := http.Get("https://api.github.com/repos/" + u.FullName + "/tags")
	if err != nil {
		return "", err
	}
	defer response.Body.Close()
	data, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return "", err
	}
	var tags []gitHubTag
	err = json.Unmarshal(data, &tags)
	if err != nil {
		return "", err
	}
	if len(tags) < 1 {
		return "", nil
	}
	return tags[0].Name, nil
}
