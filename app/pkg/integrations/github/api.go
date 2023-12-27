package github

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const apiPrefix = "https://api.github.com"
const reposAPI = apiPrefix + "/repos"

// TagEntity represents GitHub tag entity
type TagEntity struct {
	Name string `json:"name"`
}

// GetTags returns tag slice of remote repository
func GetTags(repoName string) ([]string, error) {
	apiURL := fmt.Sprintf("%v/%v/tags", reposAPI, repoName)
	response, err := http.Get(apiURL)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()
	data, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	var tags []TagEntity
	err = json.Unmarshal(data, &tags)
	if err != nil {
		return nil, err
	}
	result := make([]string, len(tags))
	for i, tag := range tags {
		result[i] = tag.Name
	}
	return result, nil
}
