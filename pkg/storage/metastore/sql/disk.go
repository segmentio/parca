// Copyright 2021 The Parca Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package sql

import (
	"database/sql"
	"fmt"

	"github.com/parca-dev/parca/pkg/storage/metastore"
	_ "modernc.org/sqlite"
)

var _ metastore.ProfileMetaStore = &DiskMetaStore{}

type DiskMetaStore struct {
	*sqlMetaStore
}

func NewDiskProfileMetaStore(path ...string) (*DiskMetaStore, error) {
	var dsn string
	if len(path) > 0 {
		dsn = path[0]
	}
	db, err := sql.Open("sqlite", dsn)
	if err != nil {
		db.Close()
		return nil, err
	}

	sqlite := &sqlMetaStore{db}
	if err := sqlite.migrate(); err != nil {
		return nil, fmt.Errorf("migrations failed: %w", err)
	}

	return &DiskMetaStore{sqlMetaStore: sqlite}, err
}